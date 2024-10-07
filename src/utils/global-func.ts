import { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

/**
 * Intercepts the Axios request to add an Authorization header if a valid session is found.
 *
 * This function retrieves the current session using `getSession()`. If the session has an error
 * indicating that the refresh token has expired (`RefreshAccessTokenError`) or if the user
 * cannot be found (`userNotFound`), it redirects the user to the logout page (`/logout`).
 *
 * Otherwise, if the session contains a valid access token, the token is added to the request
 * headers as the `Authorization` header.
 *
 * @param {InternalAxiosRequestConfig} config - The Axios request configuration object.
 * @returns {Promise<InternalAxiosRequestConfig>} The updated Axios request configuration with
 * added authorization header if applicable.
 */
export async function axiosInterceptors(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  const session: any = await getSession();

  const url = "/";
  const isError = session?.error === "RefreshAccessTokenError";
  const isUserNotFound = session?.userNotFound;

  if (
    (isError && window?.location.pathname !== "/") ||
    (isUserNotFound && config.url !== "/profile")
  ) {
    window.location.replace(url);
  } else if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
}
