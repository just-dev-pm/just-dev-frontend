/** @key [/api/agendas/,{agenda_id}] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export default function useAgenda({ agenda_id }: { agenda_id: string }) {
  const urlPrefix = `/api/agendas/`;
  const { data, error, isLoading } = useSWR(
    agenda_id ? [urlPrefix, agenda_id] : null,
    ([urlPrefix, agenda_id]) =>
      fetch(BASE_URL + urlPrefix + agenda_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取日程"))
        .then((res) => res.json()),
    { fallbackData: { id: "", name: "", events: [] } }
  );
  return {
    data,
    error,
    isLoading,
  };
}
