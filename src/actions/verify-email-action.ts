"use server";

import { db } from "@/lib/db";

export const verifyEmail = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    throw new Error("Email already verified (or) Token does not exist!");
  }

  const hasExpired = new Date(existingToken.expires) > new Date();

  if (!hasExpired) {
    throw new Error("Token has expired!");
  }

  const existingUser = await db.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    throw new Error("User does not exist!");
  }

  if (existingUser.emailVerified) {
    return { success: "Email is already verified!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() },
  });

  //remove the token after successfull verification
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
