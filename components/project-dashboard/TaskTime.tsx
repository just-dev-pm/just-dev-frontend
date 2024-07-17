import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import useProjectTasks from "@/app/api/task/get-project-tasks";
import { ProjectTasksResponseSchema } from "@/types/task/projectTasks";
import { group } from "radash";

export default function TaskTime({ projectId }: { projectId: string }) {
    const { data, isLoading, error } = useProjectTasks({
        project_id: projectId,
    });

    if (isLoading) return <>Loading</>;
    if (error) return <>Error</>;

    const tasks = ProjectTasksResponseSchema.parse(data)?.tasks;

    const chartData = Object.entries(
        group(tasks, (task) =>
            task.deadline.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
            })
        )
    ).map(([key, value]) => ({
        month: key,
        incomplete:
            value?.filter((task) => task.status.category === "incomplete")
                .length ?? 0,
        complete:
            value?.filter((task) => task.status.category === "complete")
                .length ?? 0,
    }));

    const chartConfig = {
        all: {
            label: "Incomplete",
        },
        complete: {
            label: "Complete",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>任务完成图</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="incomplete"
                            stackId="a"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="complete"
                            stackId="a"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
