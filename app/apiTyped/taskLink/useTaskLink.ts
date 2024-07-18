/** @key [/api/links/tasks/,{task_id}] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR, { mutate } from "swr";

import * as z from "zod";

// 关联类型，分组
//
// 任务关联类型

export const TaskRelationTypeSchema = z.enum([
    "auto",
    "dep",
]);
export type TaskRelationType = z.infer<typeof TaskRelationTypeSchema>;

export const ToSchema = z.object({
    "id": z.string(),
});
export type To = z.infer<typeof ToSchema>;

export const FromSchema = z.object({
    "id": z.string(),
});
export type From = z.infer<typeof FromSchema>;

export const TaskRelationSchema = z.object({
    "category": TaskRelationTypeSchema,
    "from": FromSchema,
    "id": z.string(),
    "to": ToSchema,
});
export type TaskRelation = z.infer<typeof TaskRelationSchema>;

export const ResponseSchema = z.object({
    "task_links": z.array(TaskRelationSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useTaskLink(task_id: string) {
  const urlPrefix = `/api/links/tasks/`;
  const { data, error, isLoading } = useSWR(
    task_id ? [urlPrefix, task_id] : null,
    ([urlPrefix, task_id]) =>
      fetch(BASE_URL + urlPrefix + task_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取任务关联"))
        .then((res) => res.json())
        .then(res => ResponseSchema.parse(res)),
    {
      suspense: true,
      fallbackData: { task_links: [] },
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate
  };
}
