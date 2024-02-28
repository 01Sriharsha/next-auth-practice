"use server";

import { revalidatePath } from "next/cache";
import { compareSync, hash } from "bcryptjs";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  NewPasswordSchema,
  NewPasswordSchemaType,
  UserDetailsSchema,
  UserDetailsSchemaType,
} from "@/schemas";
import { getUserById } from "@/util/user";

export const updateUserDetails = async (values: UserDetailsSchemaType) => {
  const parsedSchema = UserDetailsSchema.safeParse(values);

  if (!parsedSchema.success) {
    throw new Error("Invalid input!");
  }

  const { name, image, twoFactorEnable } = parsedSchema.data;

  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const updated = await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      image,
      isTwoFactorEnabled: twoFactorEnable,
    },
  });

  if (!updated) throw new Error("Failed to update user");

  revalidatePath("/settings");
  return { success: "User updated successfully" };
};

export const changePassword = async (values: NewPasswordSchemaType) => {
  const parsedSchema = NewPasswordSchema.safeParse(values);

  if (!parsedSchema.success) {
    throw new Error("Invalid input!");
  }

  const { password, confirmPassword } = parsedSchema.data;

  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const existingUser = await getUserById(session.user.id!);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isSamePassword = compareSync(password, existingUser.password!);

  if (isSamePassword) {
    throw new Error("Password should not be same as old one!");
  }

  const hashedPassword = await hash(password, 10);

  const updated = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!updated) throw new Error("Failed to change password");

  return { success: "Password changed successfully" };
};
