import axiosClient from "@/helper/call-center";

export const mockApi = {
  getAlluser() {
    return axiosClient.get("/users");
  },
};
