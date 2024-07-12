"use client";

import TaskItemCard from "@/app/(home)/components/taskItemCard";
import { BASE_URL } from "@/lib/global";
import { task_items_data } from "@/lib/Mockdata";
import { useRouter } from "next/router";
import useSWR from "swr";

interface IProps {
  params: {
    project_id: string
    task_list_id: string;
    task_id: string;
  };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { project_id,task_list_id, task_id } = params;
  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error } = useSWR(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { tasks: [] } }
  );

  if (data.tasks.length === 0) {
    return <div>loading...</div>;
  }
  // const cardData = data;
  console.log(data);
  // const cardData = data.find((task: { id: string; })=> task.id === task_id)
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
        isProject={false}
      ></TaskItemCard>
    </div>
  );
}
