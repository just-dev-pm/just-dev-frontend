/** @key [/api/task_lists/,{task_list_id},/tasks/,{task_id}] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useTaskDelete(
  task_list_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/task_lists/`;
  const urlMidfix = `/tasks/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    task_list_id ? [urlPrefix, task_list_id, urlMidfix] : null,
    ([urlPrefix, task_list_id, urlMidfix], { arg }: { arg: string }) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlMidfix + arg, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除任务"))
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
