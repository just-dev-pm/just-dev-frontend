import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { cn } from "@/lib/utils";
import Loading from "../ui/loading";

export default function TaskTime({
  projectId,
  className,
}: {
  projectId: string;
  className: string;
}) {
  const { data, isLoading, error } = useProjectTasks({
    project_id: projectId,
  });

    if (isLoading) return <>Loading</>;
    if (error) return <>Error</>;

  const tasks = ProjectTasksResponseSchema.parse(data)?.tasks;

  const chartData = Object.entries(
    group(tasks, (task) =>
      task.deadline.toLocaleDateString(undefined, {
        //year: "numeric",
        month: "2-digit",
      })
    )
  ).map(([key, value]) => ({
    month: key,
    incomplete:
      value?.filter((task) => task.status.category === "incomplete").length ??
      0,
    complete:
      value?.filter((task) => task.status.category === "complete").length ?? 0,
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
        <CardDescription>最近的任务完成情况</CardDescription>
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
          请关注近期的任务完成情况
        </div>
      </CardFooter>
    </Card>
  );
}
