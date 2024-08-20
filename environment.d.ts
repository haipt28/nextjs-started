declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_REFESH_TOKEN_NAME: string;
      NEXT_PUBLIC_ACCESS_TOKEN_NAME: string;
      NEXT_PUBLIC_DOMAIN: string;
      NEXT_PUBLIC_BACKEND_DOMAIN: string;
      KEYCLOAK_CLIENT_ID: string;
      KEYCLOAK_REALM_ID: string;
      KEYCLOAK_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      KEYCLOAK_BASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
