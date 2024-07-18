/** @key [/api/projects/,{project_id},/task_lists] */

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

export default function useProjectTaskListCreate(project_id: string,  onSuccess?: (data?: any) => void,) {
  const { toast } = useToast();
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/task_lists`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建项目任务列表"))
        .then((res) => res.json())
        .then(res => ResponseSchema.parse(res)),
    {
      onError(error,key,config) {
        toast({ description: "创建失败" });
      },
      onSuccess(data,key,config) {
        toast({ description: "创建成功" });
        if(onSuccess) onSuccess(data)
      },
    },
  );
  return {
    data,
    error,
    trigger,
    isMutating
  };
}
