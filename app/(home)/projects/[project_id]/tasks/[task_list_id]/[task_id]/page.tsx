"use client";

import TaskItemCard from "@/app/(home)/tasks/components/taskItemCard";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import Loading from "@/components/ui/loading";
import { BASE_URL } from "@/lib/global";
import { task_items_data } from "@/lib/Mockdata";
import useSWR from "swr";

interface IProps {
  params: {
    task_list_id: string;
    task_id: string;
  };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { task_list_id, task_id } = params;
  const { data, error, isLoading } = useTasksFromTaskList({ task_list_id });
  if (isLoading) {
    return <Loading />
  }
  
  console.log(data);
  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id
  );
  console.log("cardDate:", cardData);
  return (
    <div className="">
      <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={true}
      ></TaskItemCard>
    </div>
  );
}
