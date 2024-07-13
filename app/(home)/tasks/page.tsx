"use client";

import TaskListOverrall from "@/app/(home)/tasks/components/task-list-overrall";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";


const TaskListsPage: React.FC = () => {
  const userId = useUserStore(stats => stats.userId);
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/task_lists`;
  const { data, error } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, userId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        credentials: "include",
      }).then(res => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { task_lists: [] } }
  );
  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <TaskListOverrall taskLists={data.task_lists} />
    </div>
  );
};

export default TaskListsPage;
