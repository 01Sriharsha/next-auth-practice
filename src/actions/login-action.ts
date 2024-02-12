"use server";

import { LoginSchema, LoginSchemaType } from "@/schemas";

export const login = async (values: LoginSchemaType) => {
  const parsedData = LoginSchema.safeParse(values);

  if (!parsedData.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent" };
};
