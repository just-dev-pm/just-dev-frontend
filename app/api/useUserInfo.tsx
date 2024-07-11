import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";

export function useUserInfo(
  { userId }: { userId?: string } = { userId: undefined }
) {
  const user_Id = userId || useUserStore((state) => state.userId);
  const url = `/api/users/`;
  const { data, error } = useSWR(
    user_Id ? [url, user_Id] : null,
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
