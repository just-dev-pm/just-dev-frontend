import { ProjectDataResponse } from "@/types/project/projectData";
import { ProjectTasksResponse } from "@/types/task/projectTasks";
import useSWR from "swr";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart } from "recharts";
import { Pie } from "recharts";
import { useProjectInfo } from "@/app/api/project/get-projectInfo";
import useProjectTasks from "@/app/api/task/get-project-tasks";

export default function TaskDistribution({ projectId }: { projectId: string }) {
    const { data: project_data } = useProjectInfo(projectId);

    const { data, error, isLoading } = useProjectTasks({
        project_id: projectId,
    });

    if (error) return <>Error {error}</>;
    if (isLoading) return <>Loading...</>;

    const status_pool = (project_data as ProjectDataResponse).status_pool;
    const tasks = (data as ProjectTasksResponse).tasks;

    const taskStatusDistributionIncomplete =
        status_pool?.incomplete.map((status) => {
            const distribution = tasks.filter(
                (t) =>
                    t.status.category === "incomplete" &&
                    t.status.id === status.id
            ).length;

            return {
                name: status.status.name,
                distribution,
            };
        }) ?? [];

    const taskStatusDistributionComplete = {
        name: status_pool?.complete.name ?? "complete",
        distribution: tasks.filter((t) => t.status.category === "complete")
            .length,
    };

    const taskStatusDistribution = taskStatusDistributionIncomplete.concat(
        taskStatusDistributionComplete
    );

    const chartConfig = {
        contribution: {
            label: "Contribution",
        },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>任务状态</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={taskStatusDistribution}
                            dataKey="distribution"
                            nameKey="name"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
