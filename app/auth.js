import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./lib/utils";
import { User } from "./lib/models";
import { authConfig } from "./authconfig";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectDB();
    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Wrong credentials");
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong password");
    return user;
  } catch (err) {
    console.log(err)
  }
};
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },
});
