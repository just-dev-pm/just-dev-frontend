"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
// import { ProjectDataResponse, StatusPool } from "@/types/project/projectData";
import { Circle } from "lucide-react";
import Loading from "../ui/loading";
import useProjectTasks from "@/app/apiTyped/task/useProjectTasks";
import { Task } from "@/app/apiTyped/task/useProjectTasks";
import useProjectInfo,{StatusPool} from "@/app/apiTyped/project/useProjectInfo";

const getColumns: (
  status_pool: StatusPool | null | undefined,
) => ColumnDef<Task>[] = (status_pool) => {
  let status_column: ColumnDef<Task>[] = [];
  if (status_pool) {
    status_column = [
      {
        accessorKey: "status",
        header: "当前状态",
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
      header: "尚未完成的任务",
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

export default function IncompletedTaskTable({
  project_id,
}: {
  project_id: string;
}) {
  const {
    data: project_data,
    error: project_error,
    isLoading: project_data_loading,
  } = useProjectInfo(project_id);

  const {
    data,
    error,
    isLoading: project_tasks_loading,
  } = useProjectTasks(project_id);

  if (error || project_error) return <>Error {error}</>;
  if (project_data_loading || project_tasks_loading) return <Loading />;

  const tasks = data.tasks.filter(
    (task) => task.status.category === "incomplete",
  );

  const status_pool = (project_data).status_pool;
  const columns = getColumns(status_pool);

  return <DataTable columns={columns} data={tasks} />;
}
