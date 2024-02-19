import { v4 as uuid } from "uuid";

import { db } from "@/lib/db";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //1hr

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const resetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return resetToken;
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    if (!resetToken) {
      throw new Error("Token not found!");
    }
    return resetToken;
  } catch (error: any) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    if (!resetToken) {
      throw new Error("Token not found!");
    }
    return resetToken;
  } catch (error: any) {
    return null;
  }
};
