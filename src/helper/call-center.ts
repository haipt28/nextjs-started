import { axiosInterceptors } from "@/utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosClient = axios.create({
  baseURL: "/service/",
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return axiosInterceptors(config);
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
