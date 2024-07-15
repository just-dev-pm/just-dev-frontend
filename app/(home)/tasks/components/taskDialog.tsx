import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TasksList from "./tasksBoardList";
import { BASE_URL } from "@/lib/global";
import useSWR from "swr";
import { Task } from "@/types/tasks_list/tasks";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";

export function TasksBoardView({
  task_list_id,
  list_name,
  project,
}: {
  task_list_id: string;
  list_name: string;
  project: { isProject: boolean; projectId: string };
}) {
  const { data, error } = useTasksFromTaskList({ task_list_id });

  const dialog_tasks: Task[] = data.tasks;

  const complete_tasks = dialog_tasks.filter((task)=> task.status.category === "complete")
  const incomplete_tasks = dialog_tasks.filter((task)=> task.status.category === "incomplete")
  return (
    <div className="flex gap-6">
      <TasksList
        todoListName={"incomplete"}
        tasks={incomplete_tasks}
        project={project}
        dialogMessage={""}
        dialogMembers={[]}
      ></TasksList>
      <TasksList
        todoListName={"complete"}
        tasks={complete_tasks}
        project={project}
        dialogMessage={""}
        dialogMembers={[]}
      ></TasksList>
    </div>
  );
}
