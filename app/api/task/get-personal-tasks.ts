/** @key /api/users/{user_id}/tasks/personal */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { GetUserPersonalTasksResponseSchema } from "@/types/GetUserPersonalTasksResponse";
import useSWR from "swr";

import * as z from "zod";


export const CategorySchema = z.enum([
    "complete",
    "incomplete",
]);
export type Category = z.infer<typeof CategorySchema>;

export const StatusSchema = z.object({
    "category": CategorySchema,
    "id": z.union([z.null(), z.string()]).optional(),
});
export type Status = z.infer<typeof StatusSchema>;

export const PrSchema = z.object({
    "owner": z.string(),
    "pull_number": z.number(),
    "repo": z.string(),
});
export type Pr = z.infer<typeof PrSchema>;

export const AssigneeSchema = z.object({
    "id": z.string(),
});
export type Assignee = z.infer<typeof AssigneeSchema>;

export const TaskSchema = z.object({
    "assignees": z.array(AssigneeSchema),
    "deadline": z.coerce.date(),
    "description": z.string(),
    "id": z.string(),
    "name": z.string(),
    "pr": z.union([PrSchema, z.null()]).optional(),
    "status": StatusSchema,
    "task_list_id": z.string(),
});
export type Task = z.infer<typeof TaskSchema>;

export const ResponseSchema = z.object({
    "tasks": z.array(TaskSchema),
});
export type Response = z.infer<typeof ResponseSchema>;


export default function useUserPersonalTasks({ user_id }: { user_id: string }) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/tasks/personal`;
  const { data, error, isLoading } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(handleResponse("获取用户的个人任务"))
      .then((res) => {
        return res.json()
      })
      .then(data => {
        console.log("get personal tasks", data)
        return ResponseSchema.parse(data)
      }),
    {
      suspense: true,
      fallbackData: { tasks: [] },
      refreshInterval: 5000
    }
  );

  console.log("jxkb", data)
  return {
    data,
    error,
    isLoading,
  };
}
