import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";
import * as z from "zod";

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

export default function useTaskList(task_list_id: string) {
  const urlPrefix = `/api/task_lists/`;
  const { data, error, isLoading, mutate } = useSWR(
    task_list_id ? [urlPrefix, task_list_id] : null,
    ([urlPrefix, task_list_id]) =>
      fetch(BASE_URL + urlPrefix + task_list_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取任务列表"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      fallbackData: { id: "", name: "", tasks: [] },
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
