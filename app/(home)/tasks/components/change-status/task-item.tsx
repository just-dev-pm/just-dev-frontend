"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Task } from "./task";
import { ChangeStatusTrigger } from "./trigger";

export default function TaskItem({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const path = usePathname();

  if (!task.status) return <></>;
  const statusId =
    task.status.category === "complete" ? "complete" : task.status.id;
  return (
    <div className="flex items-center z-50 gap-4" key={task.id}>
      <ChangeStatusTrigger statusId={statusId!} />
      <div className="w-full px-2">
        <Link href={`${path}/${task.id}`}>{task.name}</Link>
      </div>
    </div>
  );
}
