import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import KeycloakProvider, {
  KeycloakProfile,
} from "next-auth/providers/keycloak";
import { OAuthConfig } from "next-auth/providers/oauth";
import { IKeycloakRefreshTokenApiResponse } from "./keycloakRefreshToken";

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const refreshedTokens = await axios.post<IKeycloakRefreshTokenApiResponse>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/keycloakRefreshToken",
      {
        refreshToken: token?.refreshToken,
      }
    );

    if (refreshedTokens.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpired: Date.now() + refreshedTokens.data.expires_in * 1000,
      refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + refreshedTokens.data.refresh_expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const issuar = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_ID}`;

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: issuar,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
    },
    async signIn({ account, user }: any) {
      // const instance = CookieStoreControl.getInstance();
      if (account && user) {
        // const { access_token, expires_at } = account;
        // const { refresh_token, refresh_expires_in } = account;
        // const instance = CookieStoreControl.getInstance();

        // instance.token.set_access_token(access_token, expires_at * 1000);
        // instance.token.set_refresh_token(
        //     refresh_token,
        //     Date.now() + refresh_expires_in! * 1000
        // );
        return true;
      } else {
        return false;
      }
    },

    jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        // Add access_token, refresh_token and expirations to the token right after signin
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at! * 1000;
        token.refreshTokenExpired =
          Date.now() + account.refresh_expires_in! * 1000;
        token.user = user;

        token.id_token = account.id_token;
        token.provider = account.provider;

        console.log("--------------------------------");
        const time = new Date(Date.now() + account.refresh_expires_in! * 1000);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        const timeString = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        console.log("refresh_token expires: ", timeString);
        console.log("--------------------------------");

        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpired) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.refreshTokenExpired = token.refreshTokenExpired;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Generate secret: openssl rand -base64 32
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: undefined,
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === "keycloak") {
        const issuerUrl = (
          authOptions.providers.find(
            (p) => p.id === "keycloak"
          ) as OAuthConfig<KeycloakProfile>
        ).options!.issuer!;
        const logOutUrl = new URL(
          `${issuerUrl}/protocol/openid-connect/logout`
        );
        logOutUrl.searchParams.set("id_token_hint", token.id_token!);
        await fetch(logOutUrl);
      }
    },
  },
};
export default NextAuth(authOptions);
