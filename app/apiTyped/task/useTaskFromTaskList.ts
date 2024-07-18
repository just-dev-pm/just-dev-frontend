import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/task_lists/,{task_list_id},/tasks] */

import * as z from "zod";

export const CategorySchema = z.enum(["complete", "incomplete"]);
export type Category = z.infer<typeof CategorySchema>;

export const StatusSchema = z.object({
  category: CategorySchema,
  id: z.union([z.null(), z.string()]).optional(),
});
export type Status = z.infer<typeof StatusSchema>;

export const PrSchema = z.object({
  owner: z.string(),
  pull_number: z.number(),
  repo: z.string(),
});
export type Pr = z.infer<typeof PrSchema>;

export const AssigneeSchema = z.object({
  id: z.string(),
});
export type Assignee = z.infer<typeof AssigneeSchema>;

export const TaskSchema = z.object({
  assignees: z.array(AssigneeSchema),
  deadline: z.string(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  pr: z.union([PrSchema, z.null()]).optional(),
  status: StatusSchema,
});
export type Task = z.infer<typeof TaskSchema>;

export const ResponseSchema = z.object({
  tasks: z.array(TaskSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useTasksFromTaskList(task_list_id: string) {
  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error, isLoading, mutate } = useSWR(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取任务列表的任务"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { tasks: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
