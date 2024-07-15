/** @key [/api/users/,{user_id},/task_lists] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useUserTasklistCreate({
  user_id,
}: {
  user_id: string;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/task_lists`;
  const { data, error, trigger } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    (
      [urlPrefix, user_id, urlSuffix],
      { arg: { name } }: { arg: { name: string } }
    ) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      })
        .then(handleResponse("创建用户任务列表"))
        .then((res) => res.json()),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess() {
        toast({ description: "创建成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
