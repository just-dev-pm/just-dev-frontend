"use client";

import { StatusPoolProvider } from "@/app/(home)/components/status/context";
import useTaskChange from "@/app/api/task/change-task";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import useTaskLink from "@/app/api/tasklink/get-tasklink";
import Loading from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "rsuite";
import { mutate } from "swr";
import { NewRelationContextProvider } from "../../components/add-relation/context";
import { useSWRNewRelation } from "../../components/add-relation/swr";
import { AddRelationTrigger } from "../../components/add-relation/trigger";
import { ChangeStatusContextProvider } from "../../components/change-status/context";
import { ChangeTaskContextProvider } from "../../components/change/context";
import { UserTaskView } from "../../components/change/user-view";
import { UserTasksProvider } from "../../components/list/user/context";
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
  const { trigger: taskChangeTrigger } = useTaskChange({ task_list_id });
  const { trigger: relationAddTrigger } = useSWRNewRelation();

  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id,
  );

  const { data: taskLink, isLoading: loadingTaskLink } = useTaskLink({
    task_id: cardData?.id,
  });
  if (isLoading || !cardData) {
    return <Loading />;
  }

  if (data.tasks.length === 0) {
    return <Loading />;
  }

  if (!taskLink || loadingTaskLink) return <Loading />;
  async function handleTaskChange(res: any) {
    await taskChangeTrigger({ res, task_id });
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
  }
  // const cardData = data;
  // console.log(data);
  // const cardData = data.find((task: { id: string; })=> task.id === task_id)

  console.log("cardDate:", cardData);

  async function handleSubmit(data: any) {
    console.log(data);
    await relationAddTrigger(data);
    mutate(["/api/links/tasks/", task_id]);
  }
  return (
    <UserTasksProvider>
      <div className="p-8 flex flex-col gap-4">
        {/* <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={false}
      ></TaskItemCard> */}
        <div className="flex gap-4 items-center">
          <h4>任务信息</h4>
          <CopyToClipboard
            text={cardData.id}
            onCopy={() => {
              toast({
                title: `成功复制任务${cardData.name}的ID`,
                description: cardData.id,
              });
            }}
          >
            <Button appearance="link" className="underline decoration-dashed">
              复制ID
            </Button>
          </CopyToClipboard>
        </div>
        <ChangeTaskContextProvider
          initialData={cardData}
          handleTaskChange={handleTaskChange}
        >
          <StatusPoolProvider>
            <ChangeStatusContextProvider
              handleTaskChange={handleTaskChange}
              task_id={cardData.id}
            >
              <UserTaskView />
            </ChangeStatusContextProvider>
          </StatusPoolProvider>
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
        {taskLink.task_links.length === 0 ? (
          <p>该任务无关联任务</p>
        ) : (
          <TaskRelationView
            taskLinks={taskLink.task_links}
            taskId={cardData?.id}
          />
        )}
      </div>
    </UserTasksProvider>
  );
}
