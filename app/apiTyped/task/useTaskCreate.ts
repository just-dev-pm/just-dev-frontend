/** @key /api/task_lists/{task_list_id}/tasks */

import { statusSchema } from "@/app/(home)/tasks/components/form/create-task-context";
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

export const RequestRequestSchema = z.object({
  assignees: z.array(RequestAssigneeSchema),
  deadline: z.string(),
  description: z.string(),
  name: z.string(),
  pr: z.union([RequestPrSchema, z.null()]).optional(),
  status: RequestStatusSchema,
});
export type Request = z.infer<typeof RequestRequestSchema>;

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

export default function useTaskCreate(
  task_list_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("添加任务"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(error, key, config) {
        toast({ description: "添加失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "添加成功" });
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

const formSchema = z.object({
  name: z.string().min(1, "任务名不能为空"),
  description: z.string().min(1, "任务描述不能为空"),
  assignees: z.array(z.object({ id: z.string() })),
  deadline: z.date({ required_error: "截止时间不能为空" }),
  pr: z
    .object({
      owner: z.string(),
      repo: z.string(),
      pull_number: z.number(),
      title: z.string(),
    })
    .optional(),
  status: statusSchema,
});

type Form = z.infer<typeof formSchema>;
