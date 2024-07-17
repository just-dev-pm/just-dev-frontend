/** @key [/api/agendas/,{agenda_id},/events] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

type event = {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  participants?: { id: string }[];
};

export default function useEventAdd({ agenda_id }: { agenda_id: string }) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events`;
  const { data, error, trigger } = useSWRMutation(
    agenda_id ? [urlPrefix, agenda_id, urlSuffix] : null,
    ([urlPrefix, agenda_id, urlSuffix], { arg }: { arg: event }) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("添加事件"))
        .then((res) => res.json()),
    {
      onError() {
        toast({ description: "添加失败" });
      },
      onSuccess() {
        toast({ description: "添加成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
