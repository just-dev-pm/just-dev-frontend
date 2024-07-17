import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import { Task } from "@/types/tasks_list/tasks";
import TasksList from "./tasksBoardList";
import { useProject } from "@/app/api/project/get-project";
import { useUserInfo } from "@/app/api/useUserInfo";
import { useUserStore } from "@/store/userStore";
import { Key } from "react";

export function TasksBoardView({
  task_list_id,
  list_name,
  project,
}: {
  task_list_id: string;
  list_name: string;
  project: { isProject: boolean; projectId: string };
}) {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error } = useTasksFromTaskList({ task_list_id });

  const dialog_tasks: Task[] = data.tasks;
  let status_pool = undefined;
  if (project.isProject) {
    const { data, error, isLoading } = useProject(project.projectId);
    status_pool = data.status_pool;
  } else {
    const { data, error, isLoading } = useUserInfo({ userId });
    status_pool = data.status_pool;
  }

  const complete_tasks = dialog_tasks.filter(
    (task) => task.status.category === "complete"
  );
  const incomplete_tasks = dialog_tasks.filter(
    (task) => task.status.category === "incomplete"
  );

  const complete_status_title = status_pool.complete.name;
  const imcomplete_status = status_pool.incomplete;

  return (
    <div className="flex justify-start gap-6">
      {imcomplete_status.map(
        (
          imcomplete: { status: { name: string }; id: string | undefined },
          index: Key | null | undefined
        ) => (
          <TasksList
            key={index}
            todoListName={"incomplete: " + imcomplete.status.name}
            tasks={incomplete_tasks.filter(
              (task) => task.status.id === imcomplete.id
            )}
            project={project}
            dialogMessage={""}
            dialogMembers={[]}
            task_list_id={task_list_id}
          ></TasksList>
        )
      )}
      <TasksList
        todoListName={"complete:  " + complete_status_title}
        tasks={complete_tasks}
        project={project}
        dialogMessage={""}
        dialogMembers={[]}
        task_list_id={task_list_id}
      ></TasksList>
    </div>
  );
}
