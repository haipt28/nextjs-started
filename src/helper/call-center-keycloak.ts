import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import moment from "moment";
import { getSession } from "next-auth/react";

const axiosKeycloak = axios.create({
  baseURL: "/keycloak/",
});

axiosKeycloak.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session: any = await getSession();
    console.log("session", session);

    if (session?.error === "RefreshAccessTokenError" && window) {
      const url = process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/signin";
      window.location.replace(url);
    }

    if (session) {
      const { accessToken } = session;

      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }
    }
    return config;
  },
  (err: AxiosError) => {
    console.log("Error status: ", err.status);

    return Promise.reject(err);
  }
);

axiosKeycloak.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },

  async (err) => {
    return Promise.reject(err);
  }
);

export default axiosKeycloak;
