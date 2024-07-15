/** @key [/api/users/,{user_id},/agendas] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export default function useUserAgenda({ user_id }: { user_id: string }) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/agendas`;
  const { data, error } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取用户日程"))
        .then((res) => res.json()),
    { fallbackData: { agendas: [] } }
  );
  return { data, error };
}
