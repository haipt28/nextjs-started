import axiosKeycloak from "@/helper/call-center-keycloak";

export const keyCloakApi = {
  getProfile() {
    const url = `/realms/myrealm/protocol/openid-connect/userinfo`;
    return axiosKeycloak.get(url);
  },
};
