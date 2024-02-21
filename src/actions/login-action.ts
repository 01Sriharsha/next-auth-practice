"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/util/user";
import { generateVerificationToken } from "@/util/verification-token";
import { getTwoFactorConfirmationByUserId } from "@/util/two-factor-confirmation";
import {
  generateTwoFactorToken,
  getTwoFactorTokenByToken,
} from "@/util/two-factor-token";

export const login = async (values: LoginSchemaType) => {
  const parsedData = LoginSchema.safeParse(values);

  if (!parsedData.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, code } = parsedData.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    throw new Error("Email does not exists!");
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Validate the provided two factor token
      const twoFactorToken = await getTwoFactorTokenByToken(code);
      if (!twoFactorToken || twoFactorToken.token !== code) {
        throw new Error("Invalid Code");
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        throw new Error("Confirmation code has expired!");
      }

      //remove the validated token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      const tf = await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
      console.log({ tf });
    } else {
      const validationCode = await generateTwoFactorToken(email);
      await sendTwoFactorEmail(email, validationCode.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Something went wrong");
      }
    }
  }
};
