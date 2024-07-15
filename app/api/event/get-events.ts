/** @key [/api/agendas/,{agenda_id},/events] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export default function useEvent({ agenda_id }: { agenda_id: string }) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events`;
  const { data, error } = useSWR(
    agenda_id ? [urlPrefix, agenda_id, urlSuffix] : null,
    ([urlPrefix, agenda_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取事件"))
        .then((res) => res.json()),
    { fallbackData: { events: [] } }
  );
  return {
    data,
    error,
  };
}
