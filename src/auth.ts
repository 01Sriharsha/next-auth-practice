import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getOAuthUserAccount, getUserById } from "@/util/user";
import { getTwoFactorConfirmationByUserId } from "@/util/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow sigin for oauth login
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id!);

      if (!existingUser || !existingUser.password) {
        return false;
      }

      if (!existingUser.emailVerified) {
        return false;
      }

      //2FA
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
      }

      return true;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (!user) return token;
        const oAuthUser = await getOAuthUserAccount(token.sub);

        token.isOAuth = !!oAuthUser;
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled!;
        token.email = user.email;
        token.name = user.name;
        token.picture = null;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.isOAuth = token.isOAuth;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }
      return session;
    },
  },
});
