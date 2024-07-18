"use client";

import { ProjectStatusPoolProvider } from "@/app/(home)/components/status/status-pool/project/context";
import { ProjectTasksProvider } from "@/app/(home)/projects/components/list/project/context";
import { TaskRelationView } from "@/app/(home)/projects/components/list/relation/view";
import { NewRelationContextProvider } from "@/app/(home)/tasks/components/add-relation/context";
import { useSWRNewRelation } from "@/app/(home)/tasks/components/add-relation/swr";
import { AddRelationTrigger } from "@/app/(home)/tasks/components/add-relation/trigger";
import { ChangeStatusContextProvider } from "@/app/(home)/tasks/components/change-status/context";
import { ChangeTaskContextProvider } from "@/app/(home)/tasks/components/change/context";
import { ProjectTaskView } from "@/app/(home)/tasks/components/change/project-view";
import useTaskChange from "@/app/api/task/change-task";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import useTaskLink from "@/app/api/tasklink/get-tasklink";
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
  const { trigger } = useTaskChange({ task_list_id });

  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id,
  );
  const { trigger: newRelation } = useSWRNewRelation();

  const { data: taskLink, isLoading: loadingTaskLink } = useTaskLink({
    task_id: cardData?.id,
  });
  if (isLoading || !cardData) {
    return <Loading />;
  }
  if (!taskLink || loadingTaskLink) return <Loading />;
  console.log(data);
  console.log("link", taskLink);

  console.log("cardDate:", cardData);

  async function handleTaskChange(res: any) {
    await trigger({ res, task_id });
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
  }
  async function handleSubmit(data: any) {
    console.log(data);
    await newRelation(data);
    mutate(["/api/links/tasks/", task_id]);
  }

  return (
    <ProjectTasksProvider projectId={project_id}>
      <div className="p-8 flex flex-col gap-4">
        {/* <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={true}
      ></TaskItemCard> */}
        <h4>任务信息</h4>
        <ChangeTaskContextProvider
          initialData={cardData}
          handleTaskChange={handleTaskChange}
        >
          <ProjectStatusPoolProvider projectId={project_id}>
            <ChangeStatusContextProvider
              handleTaskChange={handleTaskChange}
              task_id={cardData.id}
            >
              <ProjectTaskView projectId={project_id} />
            </ChangeStatusContextProvider>
          </ProjectStatusPoolProvider>
        </ChangeTaskContextProvider>
        <div className="flex gap-4">
          {" "}
          <h4>任务关联</h4>
          <NewRelationContextProvider
            onSubmit={handleSubmit}
            taskId={cardData.id}
          >
            <AddRelationTrigger />
          </NewRelationContextProvider>
        </div>
        {taskLink.length === 0 || taskLink.task_links.length === 0 ? (
          <p>该任务无关联任务</p>
        ) : (
          <TaskRelationView
            taskLinks={taskLink.task_links}
            taskId={cardData?.id}
          />
        )}
      </div>
    </ProjectTasksProvider>
  );
}
