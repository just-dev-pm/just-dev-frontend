/** @key /api/users/{user_id}/tasks/personal */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { GetUserPersonalTasksResponseSchema } from "@/types/GetUserPersonalTasksResponse";
import useSWR from "swr";

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
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      })
      .then(data => GetUserPersonalTasksResponseSchema.parse(data)),
    {
      suspense: true,
      fallbackData: { tasks: [] },
    }
  );
  return {
    data,
    error,
    isLoading,
  };
}
