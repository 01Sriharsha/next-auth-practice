"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema, LoginSchemaType } from "@/schemas";

export const login = async (values: LoginSchemaType) => {
  const parsedData = LoginSchema.safeParse(values);

  if (!parsedData.success) {
    throw new Error("Invalid fields");
  }

  const { email, password } = parsedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Something went wrong");
      }
    }
  }
};
