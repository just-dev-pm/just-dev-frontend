import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";
import * as z from "zod";

export const TaskSchema = z.object({
  id: z.string(),
});
export type Task = z.infer<typeof TaskSchema>;

export const TaskListSchema = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(TaskSchema),
});
export type TaskList = z.infer<typeof TaskListSchema>;

export const ResponseSchema = z.object({
  task_lists: z.array(TaskListSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useProjectTaskList(project_id: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/task_lists`;
  const { data, error, isLoading, mutate } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目任务列表"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      fallbackData: { task_lists: [] },
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
