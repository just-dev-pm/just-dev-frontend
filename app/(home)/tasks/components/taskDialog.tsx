import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TasksList from "./tasksBoardList";
import { BASE_URL } from "@/lib/global";
import useSWR from "swr";
import { Task } from "@/types/tasks_list/tasks";

export function TasksBoardView({
  task_list_id,
  list_name,
}: {
  task_list_id: string;
  list_name: string;
}) {
  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error } = useSWR(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { tasks: [] } }
  );
  const dialog_tasks: Task[] = data.tasks;
  return (
    <div className="flex gap-6">
      {dialog_tasks.map((task) => (
        <TasksList
          key={task.id}
          todoListName={list_name}
          tasks={dialog_tasks}
          dialogMessage={task.name}
          dialogMembers={task.assignees}
        ></TasksList>
      ))}
      <Button className="w-80">
        <Plus></Plus>
        {"Add Column"}
      </Button>
    </div>
  );
}
