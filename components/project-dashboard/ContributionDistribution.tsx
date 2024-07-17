"use client";

import { ProjectTasksResponse } from "@/types/task/projectTasks";
import { ProjectUsersResponse } from "@/types/project/projectUser";
import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import useSWR from "swr";
import useProjectInfo from "@/app/api/project/get-projectInfo";
import useProjectTasks from "@/app/api/task/get-project-tasks";
import useUsersInProject from "@/app/api/project/get-users-in-project";

export default function ContributionDistribution({
    project_id,
}: {
    project_id: string;
}) {
    const { data: project_users } = useUsersInProject({ project_id });

    const { data, error, isLoading } = useProjectTasks({ project_id });

    if (error) return <>Error {error}</>;
    if (isLoading) return <>Loading...</>;

    const tasks = (data as ProjectTasksResponse).tasks.filter(
        (task) => task.status.category === "complete"
    );

    const users = (project_users as ProjectUsersResponse)?.users;

    const user_contributions = users.map((user) => {
        const user_tasks = tasks.filter((task) =>
            task.assignees.map((assignee) => assignee.id).includes(user.id)
        );
        return {
            name: user.username,
            contribution: user_tasks.length,
        };
    });

    const chartConfig = {
        contribution: {
            label: "Contribution",
        },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>成员贡献</CardTitle>
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
                            data={user_contributions}
                            dataKey="contribution"
                            nameKey="name"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
