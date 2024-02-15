"use server";

import { hash } from "bcryptjs";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/util/user";

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

  return { success: "Email sent" };
};
