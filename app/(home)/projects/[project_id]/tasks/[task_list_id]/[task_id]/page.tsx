"use client";

import { ChangeTaskContextProvider } from "@/app/(home)/tasks/components/change/context";
import { ProjectTaskView } from "@/app/(home)/tasks/components/change/project-view";
import useTaskChange from "@/app/api/task/change-task";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import Loading from "@/components/ui/loading";
import { mutate } from "swr";

interface IProps {
  params: {
    project_id: string;
    task_list_id: string;
    task_id: string;
  };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { task_list_id, task_id, project_id } = params;
  const { data, error, isLoading } = useTasksFromTaskList({ task_list_id });
  const {trigger} = useTaskChange({task_list_id});
  if (isLoading) {
    return <Loading />;
  }

  console.log(data);
  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id
  );
  console.log("cardDate:", cardData);

  async function handleTaskChange(res:any){
    await trigger({res,task_id});
    mutate(["/api/task_lists/",task_list_id,"/tasks"])
  }

  return (
    <div className="">
      {/* <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={true}
      ></TaskItemCard> */}
      <ChangeTaskContextProvider initialData={cardData} handleTaskChange={handleTaskChange}>
        <ProjectTaskView projectId={project_id} />
      </ChangeTaskContextProvider>
    </div>
  );
}
