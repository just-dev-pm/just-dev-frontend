import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import useSWRImmutable from 'swr'

export function useUserInfo(
  { userId }: { userId: string }
) {
  const url = `/api/users/`;
  const { data, error } = useSWRImmutable(
    userId ? [url, userId] : null,
    ([url, user_Id]) =>
      fetch(BASE_URL + url + user_Id, {
        credentials: "include",
      }).then((res) => res.json()),
    { suspense: true, fallbackData: { username: "" } }
  );
  return {
    data,
    error,
  };
}
