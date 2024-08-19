import { CookieStoreControl } from "@/hooks/cookie-storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosClient = axios.create({
  baseURL: "/service/",
  headers: {
    "Content-Type": "application/json",
  },
});

const cookieInstance = CookieStoreControl.getInstance();
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const rf_token = cookieInstance.token.get_refresh_token();
    if (config.url === "/profile" && !rf_token) {
      return Promise.reject();
    }

    const accessToken = cookieInstance.token.get_access_token();
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
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
