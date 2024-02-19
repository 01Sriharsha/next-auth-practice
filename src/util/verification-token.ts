import { v4 as uuid } from "uuid";

import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //1hr

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken) {
      throw new Error("Token not found!");
    }

    return verificationToken;
  } catch (error: any) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    if (!verificationToken) {
      throw new Error("Token not found!");
    }

    return verificationToken;
  } catch (error: any) {
    return null;
  }
};
