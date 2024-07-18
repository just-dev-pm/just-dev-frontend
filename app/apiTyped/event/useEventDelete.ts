/** @key [/api/agendas/,{agenda_id},/events/,{event_id}] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useEventDelete(
  agenda_id: string,
  event_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const urlMidfix = `/events/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    agenda_id && event_id ? [urlPrefix, agenda_id, urlMidfix, event_id] : null,
    ([urlPrefix, agenda_id, urlMidfix, event_id]) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlMidfix + event_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除事件"))
        .then((res) => res),
    {
      onError() {
        toast({ description: "删除失败" });
      },
      onSuccess() {
        toast({ description: "删除成功" });
        if (onSuccess) onSuccess(data);
      },
    },
  );
  return {
    data,
    error,
    trigger,
    isMutating,
  };
}
