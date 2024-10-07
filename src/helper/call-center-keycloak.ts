import { axiosInterceptors } from "@/utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosKeycloak = axios.create({
  baseURL: "/keycloak/",
});

axiosKeycloak.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return axiosInterceptors(config);
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
