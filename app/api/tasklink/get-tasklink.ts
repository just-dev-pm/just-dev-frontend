/** @key [/api/links/tasks/,{task_id}] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export default function useTaskLink({ task_id }: { task_id: string }) {
  const urlPrefix = `/api/links/tasks/`;
  const { data, error } = useSWR(
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
        .then((res) => res.json()),
    {
      suspense: true,
      fallbackData: { task_links: [] },
    }
  );
  return {
    data,
    error,
  };
}
