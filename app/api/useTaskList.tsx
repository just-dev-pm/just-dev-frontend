import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

export default function useTaskList({
  task_list_id,
}: {
  task_list_id: string;
}) {
  const url = `/api/task_lists/`;
  const { data, error, isLoading } = useSWR(
    task_list_id ? [url, task_list_id] : null,
    ([url, task_list_id]) =>
      fetch(BASE_URL + url + task_list_id, {
        credentials: "include",
      }).then(res => {
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
    isLoading,
  };
}
