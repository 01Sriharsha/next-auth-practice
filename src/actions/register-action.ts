"use server";

import { hash } from "bcryptjs";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/util/user";
import { generateVerificationToken } from "@/util/verification-token";

export const register = async (values: RegisterSchemaType) => {
  const parsedData = RegisterSchema.safeParse(values);

  if (!parsedData.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, name } = parsedData.data;

  const userExists = await getUserByEmail(email);

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  const verificationToken = await generateVerificationToken(user.email!);
  const res = await sendVerificationEmail(user.email!, verificationToken.token);

  if (res.error) {
    console.error("Email confirmation error: ", res.error);
    throw new Error("Failed to send confirmation email");
  }

  return { success: "Confirmation Email sent" };
};
