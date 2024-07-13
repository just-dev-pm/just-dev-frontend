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
  project:{isProject:boolean,projectId:string}
}) {

  const {data,error} = useTasksFromTaskList({task_list_id});

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
          project={project}
        ></TasksList>
      ))}
      <Button className="w-80">
        <Plus></Plus>
        {"Add Column"}
      </Button>
    </div>
  );
}
