"use client";

import TaskListOverrall from "@/app/(home)/tasks/components/task-list-overrall";
import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

const TaskListsPage = ({ params }: { params: { project_id: string } }) => {
  const { project_id } = params;
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/task_lists`;
  const { data, error } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        credentials: "include",
      }).then((res) => {
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
    <TaskListOverrall taskLists={data.task_lists} project={{
        isProject: true,
        project_id: project_id
      }} />
  );
};

export default TaskListsPage;
