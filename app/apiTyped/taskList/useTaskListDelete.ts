/** @key [/api/task_lists/] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useTasklistDelete(onSuccess?: (data?: any) => void) {
  const { toast } = useToast();
  const urlPrefix = `/api/task_lists/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    [urlPrefix],
    ([urlPrefix], { arg }: { arg: string }) =>
      fetch(BASE_URL + urlPrefix + arg, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除任务列表"))
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
