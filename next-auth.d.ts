import NextAuth, { type DefaultSession } from "next-auth";

import { user_role } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: user_role;
  isEnableTwoFactor: boolean;
  isOAuth: boolean;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}