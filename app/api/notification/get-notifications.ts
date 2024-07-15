import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/users/,{user_id},/notifications] */

export default function useNotifications({ user_id }: { user_id: string }) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/notifications`;
  const { data, error, isLoading, mutate } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取通知"))
        .then(res => res.json()),
    { suspense: true, fallbackData: { notifications: [] } }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
