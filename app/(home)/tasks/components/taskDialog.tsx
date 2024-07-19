import useProjectInfo from "@/app/api/project/get-projectInfo";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import { useUserInfo } from "@/app/api/useUserInfo";
import Loading from "@/components/ui/loading";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/tasks_list/tasks";
import { CircleCheck, CircleX } from "lucide-react";
import { Key } from "react";
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
  const userId = useUserStore((stats) => stats.userId);
  const { data, error, isLoading } = useTasksFromTaskList({ task_list_id });
  const {
    data: project_data,
    error: project_error,
    isLoading: project_loading,
  } = useProjectInfo(project.projectId);
  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useUserInfo({ userId });

  if (isLoading || (project.isProject && project_loading) || user_loading)
    return <Loading />;

  const dialog_tasks: Task[] = data.tasks;
  let status_pool = undefined;
  if (project.isProject) {
    status_pool = project_data.status_pool;
  } else {
    status_pool = user_data.status_pool;
  }

  const complete_tasks = dialog_tasks.filter(
    (task) => task.status.category === "complete",
  );
  const incomplete_tasks = dialog_tasks.filter(
    (task) => task.status.category === "incomplete",
  );
  
  if(status_pool){
    const complete_status_title = status_pool.complete.name;
    const imcomplete_status = status_pool.incomplete;
    return (
      <div className="flex gap-8">
        {imcomplete_status.map(
          (
            imcomplete: { status: { name: string }; id: string | undefined },
            index: Key | null | undefined,
          ) => (
            <TasksList
              key={index}
              todoListIcon={
                <div className="flex gap-2 items-center">
                  <CircleX />
                  {imcomplete.status.name}
                </div>
              }
              tasks={incomplete_tasks.filter(
                (task) => task.status.id === imcomplete.id,
              )}
              project={project}
              dialogMessage={""}
              dialogMembers={[]}
              task_list_id={task_list_id}
            ></TasksList>
          ),
        )}
        <TasksList
          todoListIcon={
            <div className="flex gap-2 items-center text-green-700">
              <CircleCheck />
              {complete_status_title}
            </div>
          }
          tasks={complete_tasks}
          project={project}
          dialogMessage={""}
          dialogMembers={[]}
          task_list_id={task_list_id}
        ></TasksList>
      </div>
    );
  }
  }



