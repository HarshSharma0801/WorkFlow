import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./services/user";


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const main:any = credentials.email
        const user = await getUserByEmail(main);
        if (!user) {
          throw new Error("custom error")
        }
        return {name:user.name , email:user.email , id:user._id};
      }
    }),
  ],
} satisfies NextAuthConfig;
