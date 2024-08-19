import { authApi } from "@/api-client/index";
import { enqueueSnackbar } from "notistack";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { CookieStoreControl } from "./cookie-storage";

const HORSE_TO_MILLISECOND = 3000;

const instance = CookieStoreControl.getInstance();

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: payload,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: HORSE_TO_MILLISECOND,
    revalidateOnFocus: true,
    ...options,
  });

  async function login(payload: { account: string; password: string }) {
    try {
      const {
        data: {
          refeshtoken,
          refeshtokenExprire,
          accessToken,
          accesstokenExprire,
        },
      } = await authApi.login({
        UserName: payload.account,
        password: payload.password,
      });

      if (
        !refeshtoken ||
        !refeshtokenExprire ||
        !accessToken ||
        !accesstokenExprire
      ) {
        return false;
      }

      instance.token.set_access_token(accessToken, accesstokenExprire);
      instance.token.set_refresh_token(refeshtoken, refeshtokenExprire);

      await mutate();

      return true;
    } catch (error: any) {}
  }

  async function logout() {
    const rfToken = instance.token.get_refresh_token();

    if (rfToken) {
      await authApi.logout(rfToken);
      instance.token.remove_refresh_token();
      instance.token.remove_access_token();

      window.location.replace("/");

      mutate({}, false);
    }
  }

  const firstLoading = payload === undefined && error === undefined;

  return {
    profile: payload?.data,
    error,
    firstLoading,
    login,
    logout,
  };
}
