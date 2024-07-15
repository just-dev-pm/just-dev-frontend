/** @key [/api/agendas/,{agenda_id}] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useAgendaDelete({ agenda_id }: { agenda_id: string }) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const { data, error, trigger } = useSWRMutation(
    agenda_id ? [urlPrefix, agenda_id] : null,
    ([urlPrefix, agenda_id]) =>
      fetch(BASE_URL + urlPrefix + agenda_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除日程"))
        .then((res) => res.json()),
    {
      onError() {
        toast({ description: "删除失败" });
      },
      onSuccess() {
        toast({ description: "删除成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
