"use client";
import useTasklistDelete from "@/app/api/tasklist/delete-tasklist";
import { Loader } from "rsuite";
import { useSWRTaskLists } from "./swr";
import { TaskListView } from "./view";

function Control({ projectId }: { projectId: string }) {
  const { data, isLoading, mutate } = useSWRTaskLists(projectId);

  /**
   * 删除功能
   */
  const { trigger } = useTasklistDelete();
  function handleDelete(task_list_id: string) {
    trigger(task_list_id);
    // const newData = {
    //   taskLists: data.filter(({ id }: { id: string }) => id !== task_list_id),
    // };

    // mutate(
    //   async () => {
    //     await trigger(task_list_id);
    //     return newData;
    //   },
    //   { optimisticData: newData },
    // );
  }

  if (!data || isLoading) return <Loader center content="拼命加载中..." />;

  return <TaskListView data={data} handleDelete={handleDelete} />;
}

export { Control as TaskListControl };
