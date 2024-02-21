import crypto from "crypto";

import { db } from "@/lib/db";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(1_00_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //1hr

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }
  const tfToken = await db.twoFactorToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return tfToken;
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const tfToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return tfToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const tfToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return tfToken;
  } catch {
    return null;
  }
};
