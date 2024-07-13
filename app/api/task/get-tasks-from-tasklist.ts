import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

/** @key [/api/task_lists/,{task_list_id},/tasks] */

export default function useTasksFromTaskList({
  task_list_id,
}: {
  task_list_id: string;
}) {
  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error } = useSWR(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        method:"GET",
        headers:{
          "Content-Type":"application/json; charset=UTF-8"
        },
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { tasks: [] } }
  );
  return {
    data,
    error,
  };
}
