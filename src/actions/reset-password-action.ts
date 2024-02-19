"use server";

import { ResetSchema, ResetSchemaType } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/util/password-reset-token";
import { getUserByEmail } from "@/util/user";

export const resetPassword = async (values: ResetSchemaType) => {
  const parsedSchema = ResetSchema.safeParse(values);

  if (!parsedSchema.success) {
    throw new Error("Invalid input");
  }

  const { email } = parsedSchema.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new Error("Email does not exits!");
  }

  const resetToken = await generateResetPasswordToken(email);
  const res = await sendPasswordResetEmail(email, resetToken.token);

  if (res.error) {
    console.error("Reset email error: ", res.error.message);
    throw new Error("Failed to send password reset email");
  }

  return { success: "Reset password link sent to your email!" };
};
