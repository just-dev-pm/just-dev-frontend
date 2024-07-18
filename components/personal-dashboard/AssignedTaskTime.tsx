import useAssignedTasks from "@/app/api/task/get-assigned-tasks";
import { group } from "radash";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function AssignedTaskTime({
  userId,
  className,
}: {
  userId: string;
  className: string;
}) {
  const {
    data: tasks,
    error,
    isLoading,
  } = useAssignedTasks({ user_id: userId });

  if (isLoading) return <>Loading...</>;

  if (error) return <>Error</>;

  if (tasks) {
    const chartData = Object.entries(
      group(tasks.tasks, (task) =>
        new Date(task.deadline).toLocaleDateString(undefined, {
          month: "2-digit",
        }),
      ),
    ).map(([key, value]) => ({
      month: key,
      incomplete:
        value?.filter((task) => task.status.category === "incomplete").length ??
        0,
      complete:
        value?.filter((task) => task.status.category === "complete").length ??
        0,
    }));

    const chartConfig = {
      incomplete: {
        label: "Incomplete",
        color: "hsl(var(--chart-1))",
      },
      complete: {
        label: "Complete",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;

    return (
      <Card className={cn("flex flex-col", className)}>
        <CardHeader className="items-center">
          <CardTitle>任务完成图</CardTitle>
          <CardDescription>分配任务完成情况</CardDescription>
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
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="incomplete"
                stackId="a"
                fill={`var(--color-incomplete)`}
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="complete"
                stackId="a"
                fill={`var(--color-complete)`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            请关注近期分配给您的任务
          </div>
        </CardFooter>
      </Card>
    );
  }
}
