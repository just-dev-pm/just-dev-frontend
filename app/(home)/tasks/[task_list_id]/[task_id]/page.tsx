"use client";

import TaskItemCard from "../../components/taskItemCard";
import { BASE_URL } from "@/lib/global";
import { task_items_data } from "@/lib/Mockdata";
import { useRouter } from "next/router";
import useSWR from "swr";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import Loading from "@/components/ui/loading";

interface IProps {
  params: {
    project_id: string;
    task_list_id: string;
    task_id: string;
  };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { project_id, task_list_id, task_id } = params;
  const { data, error } = useTasksFromTaskList({ task_list_id });

  if (data.tasks.length === 0) {
    return <Loading />;
  }
  // const cardData = data;
  // console.log(data);
  // const cardData = data.find((task: { id: string; })=> task.id === task_id)
  const cardData = data.tasks.find(
    (task: { id: string }) => task.id === task_id
  );
  // console.log("cardDate:", cardData);
  return (
    <div className="">
      <TaskItemCard
        title={cardData.name}
        description={cardData.description}
        ddl={cardData.deadline}
        collaborators={cardData.assignees}
        isProject={false}
      ></TaskItemCard>
    </div>
  );
}
