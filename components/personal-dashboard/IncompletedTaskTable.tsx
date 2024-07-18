"use client";

import useAssignedTasks, {
  Task as GetAssignedTasksReponseTask,
} from "@/app/apiTyped/task/useAssignedTask";
import useUserPersonalTasks, {
  Task as GetUserPersonalTasksResponseTask,
} from "@/app/apiTyped/task/useUserTasks";
import useUserInfo, { StatusPool } from "@/app/apiTyped/user/useUserInfo";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, SquareGanttChartIcon, UserRound } from "lucide-react";
import { DataTable } from "../ui/data-table";
import Link from "next/link";

type Task =
  | (GetAssignedTasksReponseTask & { kind: "assigned" })
  | (GetUserPersonalTasksResponseTask & { kind: "personal" });

const getColumns: (
  status_pool: StatusPool | null | undefined,
) => ColumnDef<Task>[] = (status_pool) => {
  let status_column: ColumnDef<Task>[] = [];
  if (status_pool) {
    status_column = [
      {
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <div className="flex gap-2 items-center">
              <Circle className="w-4 h-4" />
              <span>
                {
                  status_pool.incomplete.find((i) => i.id === status.id!)
                    ?.status.name
                }
              </span>
            </div>
          );
        },
      },
    ];
  }
  return [
    {
      accessorKey: "name",
      header: "任务",
      cell: ({ row }) => {
        const task = row.original;
        if (task.kind === "personal") {
          return (
            <div className="flex gap-x-2 items-center">
              <UserRound />
              <Link href={`/tasks/${task.task_list_id}/${task.id}`}>
                {task.name}
              </Link>
            </div>
          );
        }
        if (task.kind === "assigned") {
          return (
            <div className="flex gap-x-2 items-center">
              <SquareGanttChartIcon />
              <Link
                href={`/projects/${task.project}/tasks/${task.task_list}/${task.id}`}
              >
                {task.name}
              </Link>
            </div>
          );
        }
      },
    },
    {
      accessorKey: "deadline",
      header: "截止日期",
      cell: ({ row }) => {
        const time = row.original.deadline;
        return (
          <time>
            {new Date(time).toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
            })}
          </time>
        );
      },
    },
    ...status_column,
  ];
};

export default function IncompletedTaskTable({ userId }: { userId: string }) {
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    error: userInfoError,
  } = useUserInfo(userId);

  const {
    data: userAssignedTasks,
    isLoading: userAssignedTasksIsLoading,
    error: userAssignedTasksError,
  } = useAssignedTasks(userId);

  const {
    data: personalTasks,
    isLoading: personalTasksIsLoading,
    error: personalTasksError,
  } = useUserPersonalTasks(userId);

  const typedAssignedTasks = userAssignedTasks;

  if (
    userInfoIsLoading ||
    userAssignedTasksIsLoading ||
    personalTasksIsLoading
  ) {
    return <div>loading...</div>;
  }

  if (userInfoError || userAssignedTasksError || personalTasksError) {
    return <div>error...</div>;
  }

  if (personalTasks && typedAssignedTasks && userInfo) {
    const tasks = [
      ...typedAssignedTasks.tasks.map((task) => ({
        ...task,
        kind: "assigned" as const,
      })),
      ...personalTasks.tasks.map((task) => ({
        ...task,
        kind: "personal" as const,
      })),
    ].filter((task) => task.status.category === "incomplete");

    const status_pool = userInfo.status_pool;
    const columns = getColumns(status_pool);

    return <DataTable columns={columns} data={tasks} />;
  }
}
