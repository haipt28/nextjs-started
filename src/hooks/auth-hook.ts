import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";

const HORSE_TO_MILLISECOND = 3000;

export function useAuth(options?: Partial<PublicConfiguration>) {
  const { data: payload, error } = useSWR("/profile", {
    dedupingInterval: HORSE_TO_MILLISECOND,
    revalidateOnFocus: true,
    ...options,
  });

  const firstLoading = payload === undefined && error === undefined;

  return {
    profile: payload?.data,
    error,
    firstLoading,
  };
}
