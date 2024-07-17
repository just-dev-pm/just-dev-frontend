"use client";

import { ProjectTasksResponse,Task } from "@/types/task/projectTasks";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";
import { DataTable } from "../ui/data-table";
import { ProjectDataResponse, StatusPool } from "@/types/project/projectData";
import { Circle, CircleCheck } from "lucide-react";
import Loading from "../ui/loading";
import { useProject } from "@/app/api/project/get-project";
import useProjectTasks from "@/app/api/task/get-project-tasks";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";

const getColumns: (
    status_pool: StatusPool | null | undefined
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
                                    status_pool.incomplete.find(
                                        (i) => i.id === status.id!
                                    )?.status.name
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
        },
        {
            accessorKey: "deadline",
            header: "截止日期",
        },
        ...status_column,
    ];
};

export default function IncompletedTaskTable({project_id}:{project_id:string}) {
    const { data: project_data,isLoading:project_data_loading } = useSWR(
        ["/api/projects/", project_id],
        ([url, projectId]) =>
          fetch(`${BASE_URL}${url}${projectId}`, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            credentials: "include",
          })
            .then(handleResponse("获取项目信息"))
            .then(res => res.json()),
        {
          fallbackData: {
            id: "",
            description: "",
            name: "",
            github: 0,
            status_pool: {
              complete: {},
              incomplete: [],
            },
          },
        }
      );

    const { data, error, isLoading:project_tasks_loading } = useProjectTasks(
        {project_id}
    );

    if (error) return <>Error {error}</>;
    if (project_data_loading || project_tasks_loading) return <Loading/>;

    const tasks = (data as ProjectTasksResponse).tasks.filter(
        (task) => task.status.category === "incomplete"
    );

    const status_pool = (project_data as ProjectDataResponse).status_pool;
    console.log(project_data);
    console.log(status_pool);
    const columns = getColumns(status_pool);

    return <DataTable columns={columns} data={tasks} />;
}
