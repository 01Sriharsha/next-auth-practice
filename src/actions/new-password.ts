"use server";

import { compareSync, hash } from "bcryptjs";

import { db } from "@/lib/db";
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/util/password-reset-token";
import { getUserByEmail } from "@/util/user";

export const newPassword = async (
  token: string,
  values: NewPasswordSchemaType
) => {
  const parsedSchema = NewPasswordSchema.safeParse(values);
  if (!parsedSchema.success) {
    throw new Error("Invalid input!");
  }

  const { password, confirmPassword } = parsedSchema.data;

  if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
    throw new Error("Passwords must match!");
  }

  const resetToken = await getPasswordResetTokenByToken(token);

  if (!resetToken) {
    throw new Error("Token not found!");
  }

  const hasExpired = new Date(resetToken.expires) < new Date();

  if (hasExpired) {
    throw new Error("Token has expired!");
  }

  const existingUser = await getUserByEmail(resetToken.email);

  if (!existingUser) {
    throw new Error("Email does not exist!");
  }

  const isSamePassword = compareSync(password, existingUser.password!);

  if (isSamePassword) {
    throw new Error("Password should not be same as old one!");
  }

  const hashedPassword = await hash(password, 10);

  const updated = await db.user.update({
    where: {
      email: resetToken.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!updated) {
    throw new Error("Failed to reset password!");
  }

  return { success: "Password updated successfully!" };
};
