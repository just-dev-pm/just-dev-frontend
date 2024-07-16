import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import { Task } from "@/types/tasks_list/tasks";
import TasksList from "./tasksBoardList";

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

  const complete_tasks = dialog_tasks.filter(
    task => task.status.status_item.category === "complete"
  );
  const incomplete_tasks = dialog_tasks.filter(
    task => task.status.status_item.category === "incomplete"
  );
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
