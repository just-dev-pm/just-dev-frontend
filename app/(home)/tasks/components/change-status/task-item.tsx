"use client";
import { useStatusPool } from "@/app/(home)/components/status/context";
import { useProjectStatusPool } from "@/app/(home)/components/status/status-pool/project/context";
import { ProjectStatusControl } from "@/app/(home)/components/status/status-pool/project/projectStatusControl";
import { StatusControl } from "@/app/(home)/components/status/status-pool/status/control";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Task } from "./task";
import { ChangeStatusTrigger } from "./trigger";

export default function TaskItem({
  task,
  index,
  projectId,
}: {
  task: Task;
  index: number;
  projectId: string;
}) {
  const path = usePathname();
  const { statusPool } = useStatusPool();
  const { statusPool: projectStatusPool } = useProjectStatusPool();

  if (!task.status || !statusPool || !projectStatusPool) return <></>;
  const statusId =
    task.status.category === "complete" ? "complete" : task.status.id;
  return (
    <div className="flex items-center z-50 gap-4" key={task.id}>
      <div>
        <ChangeStatusTrigger
          statusId={statusId!}
          statusPool={projectId ? projectStatusPool : statusPool}
          Control={() =>
            projectId ? (
              <ProjectStatusControl statusId={statusId!} />
            ) : (
              <StatusControl statusId={statusId!} />
            )
          }
        />
      </div>
      <div className="w-full px-2">
        <Link href={`${path}/${task.id}`}>{task.name}</Link>
      </div>
    </div>
  );
}
