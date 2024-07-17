"use client";

import useTaskChange from "@/app/api/task/change-task";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import Loading from "@/components/ui/loading";
import { mutate } from "swr";
import { NewRelationContextProvider } from "../../components/add-relation/context";
import { useSWRNewRelation } from "../../components/add-relation/swr";
import { AddRelationTrigger } from "../../components/add-relation/trigger";
import { ChangeTaskContextProvider } from "../../components/change/context";
import { UserTaskView } from "../../components/change/user-view";
import { relationMock } from "../../components/relation/mock";
import { TaskRelationView } from "../../components/relation/view";

interface IProps {
  params: {
    project_id: string;
    task_list_id: string;
    task_id: string;
  };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { project_id, task_list_id, task_id } = params;
  const { data, error, isLoading } = useTasksFromTaskList({ task_list_id });
  const { trigger } = useTaskChange({ task_list_id });
  const { trigger: newRelation } = useSWRNewRelation();
  if (isLoading) {
    return <Loading />;
  }

  if (data.tasks.length === 0) {
    return <Loading />;
  }
  function handleTaskChange(res: any) {
    trigger({ res, task_id });
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
  }
  // const cardData = data;
  // console.log(data);
  // const cardData = data.find((task: { id: string; })=> task.id === task_id)
  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id
  );
  console.log("cardDate:", cardData);

  function handleSubmit(data: any) {
    console.log(data);
    newRelation(data);
  }
  return (
    <div className="p-8 flex flex-col gap-4">
      {/* <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={false}
      ></TaskItemCard> */}
      <h4>任务信息</h4>
      <ChangeTaskContextProvider
        initialData={cardData}
        handleTaskChange={handleTaskChange}
      >
        <UserTaskView />
      </ChangeTaskContextProvider>
      <div className="flex gap-4">
        <h4>任务关联</h4>
        <NewRelationContextProvider
          onSubmit={handleSubmit}
          taskId={cardData.id}
        >
          <AddRelationTrigger />
        </NewRelationContextProvider>
      </div>
      <TaskRelationView taskLinks={relationMock} taskId="81" />
    </div>
  );
}
