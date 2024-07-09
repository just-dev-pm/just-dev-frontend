'use client'

import TaskItemCard from "@/app/(home)/components/taskItemCard";
import { task_items_data } from "@/lib/Mockdata";

interface IProps {
  params: { task_id: string };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { task_id } = params;
  const mockData = task_items_data[parseInt(task_id)]
  return <div className="">
  <TaskItemCard title={mockData.title} description={mockData.description} ddl={mockData.ddl} collaborators={mockData.collaborators} ></TaskItemCard>
</div>;
}
