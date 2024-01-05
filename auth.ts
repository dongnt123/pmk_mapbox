import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { user_role } from "@prisma/client";
import { database } from "./lib/database";
import { getUserById } from './lib/actions/user.actions';
import { getAccountByUserId } from "./lib/actions/account.actions";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await database.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth providers
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as user_role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(database),
  session: { strategy: "jwt" },
  ...authConfig,
})