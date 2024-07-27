import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./services/user";
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:process.env.AUTH_SECRET ,
  pages: {
    signIn: "/auth/login",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
