import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/util/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateCredentials = LoginSchema.safeParse(credentials);
        if (validateCredentials.success) {
          const { email, password } = validateCredentials.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
