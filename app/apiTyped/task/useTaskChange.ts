import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestCategorySchema = z.enum(["complete", "incomplete"]);
export type RequestCategory = z.infer<typeof RequestCategorySchema>;

export const RequestStatusSchema = z.object({
  category: RequestCategorySchema,
  id: z.union([z.null(), z.string()]).optional(),
});
export type RequestStatus = z.infer<typeof RequestStatusSchema>;

export const RequestPrSchema = z.object({
  owner: z.string(),
  pull_number: z.number(),
  repo: z.string(),
  title: z.string(),
});
export type RequestPr = z.infer<typeof RequestPrSchema>;

export const RequestAssigneeSchema = z.object({
  id: z.string(),
});
export type RequestAssignee = z.infer<typeof RequestAssigneeSchema>;

export const RequestSchema = z.object({
  assignees: z.union([z.array(RequestAssigneeSchema), z.null()]).optional(),
  deadline: z.union([z.null(), z.string()]).optional(),
  description: z.union([z.null(), z.string()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  pr: z.union([RequestPrSchema, z.null()]).optional(),
  status: z.union([RequestStatusSchema, z.null()]).optional(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseCategorySchema = z.enum(["complete", "incomplete"]);
export type ResponseCategory = z.infer<typeof ResponseCategorySchema>;

export const ResponseStatusSchema = z.object({
  category: ResponseCategorySchema,
  id: z.union([z.null(), z.string()]).optional(),
});
export type ResponseStatus = z.infer<typeof ResponseStatusSchema>;

export const ResponsePrSchema = z.object({
  owner: z.string(),
  pull_number: z.number(),
  repo: z.string(),
});
export type ResponsePr = z.infer<typeof ResponsePrSchema>;

export const ResponseAssigneeSchema = z.object({
  id: z.string(),
});
export type ResponseAssignee = z.infer<typeof ResponseAssigneeSchema>;

export const ResponseSchema = z.object({
  assignees: z.array(ResponseAssigneeSchema),
  deadline: z.string(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  pr: z.union([ResponsePrSchema, z.null()]).optional(),
  status: ResponseStatusSchema,
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useTaskChange(
  task_list_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/task_lists/`;
  const urlMidfix = `/tasks/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    task_list_id ? [urlPrefix, task_list_id, urlMidfix] : null,
    (
      [urlPrefix, task_list_id, urlMidfix],
      { arg }: { arg: { res: Request; task_id: string } },
    ) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlMidfix + arg.task_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg.res),
        credentials: "include",
      })
        .then(handleResponse("修改任务"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError() {
        toast({ description: "修改失败" });
      },
      onSuccess() {
        toast({ description: "修改成功" });
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
