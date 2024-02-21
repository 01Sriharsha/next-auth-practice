import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const confirmedUser = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    if (!confirmedUser) throw new Error("User not confirmed");
    return confirmedUser;
  } catch {
    return null;
  }
};
