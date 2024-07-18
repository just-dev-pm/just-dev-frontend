/** @key [/api/users/,{user_id},/task_lists] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestSchema = z.object({
  name: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const TaskSchema = z.object({
  id: z.string(),
});
export type Task = z.infer<typeof TaskSchema>;

export const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(TaskSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useUserTasklistCreate(
  user_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/task_lists`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      })
        .then(handleResponse("创建用户任务列表"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess() {
        toast({ description: "创建成功" });
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
