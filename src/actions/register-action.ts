"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas";

export const register = async (values: RegisterSchemaType) => {
  const parsedData = RegisterSchema.safeParse(values);

  if (!parsedData.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent" };
};
