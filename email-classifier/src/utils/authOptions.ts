import { SCOPE } from "@/helpers/googleScopes";
import GoogleProvider from "next-auth/providers/google";
import { refereshAccessToken } from "@/helpers/refereshAccessToken";
import { NextAuthOptions } from "next-auth";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
    scope: SCOPE,
  });

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 6 * 60 * 60,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt: async ({ user, token, account }: any) => {
      // pass token object to session if access token exist
      if (user && account) {
        console.log(account);
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      console.log("refresh token");
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      //   Access token has expired, try to update it
      return refereshAccessToken(token);
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
        session.error = token.error;
        session.provider = token.provider;
      }
      return session;
    },
  },
};
