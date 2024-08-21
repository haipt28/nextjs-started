import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
  baseURL: "/service/",
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session: any = await getSession();

    if (
      session?.error === "RefreshAccessTokenError" &&
      window &&
      // not check home page ("/")
      window.location.pathname !== "/"
    ) {
      const url = "/api/auth/signin";
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
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },

  async (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
