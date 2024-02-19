"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { getUserByEmail } from "@/util/user";
import { generateVerificationToken } from "@/util/verification-token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: LoginSchemaType) => {
  const parsedData = LoginSchema.safeParse(values);

  if (!parsedData.success) {
    throw new Error("Invalid fields");
  }

  const { email, password } = parsedData.data;

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
