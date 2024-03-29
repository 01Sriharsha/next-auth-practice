import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isOAuth?: boolean;
    isTwoFactorEnabled?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isOAuth?: boolean;
    isTwoFactorEnabled?: boolean;
  }
}
