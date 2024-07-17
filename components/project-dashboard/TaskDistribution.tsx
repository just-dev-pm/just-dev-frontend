import { ProjectDataResponse } from "@/types/project/projectData";
import { ProjectTasksResponse } from "@/types/task/projectTasks";
import useSWR from "swr";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PieChart } from "recharts";
import { Pie } from "recharts";
import useProjectInfo from "@/app/api/project/get-projectInfo";
import useProjectTasks from "@/app/api/task/get-project-tasks";
import { cn } from "@/lib/utils";
import Loading from "../ui/loading";

export default function TaskDistribution({
  projectId,
  className = "",
}: {
  projectId: string;
  className?: string;
}) {
  const { data: project_data } = useProjectInfo(projectId);

  const { data, error, isLoading } = useProjectTasks({
    project_id: projectId,
  });

  if (error) return <>Error {error}</>;
  if (isLoading) return <Loading />;

  const status_pool = (project_data).status_pool;
  const tasks = (data).tasks;

  const taskStatusDistributionIncomplete =
    status_pool?.incomplete.map((status) => {
      const distribution = tasks.filter(
        (t) => t.status.category === "incomplete" && t.status.id === status.id
      ).length;

      return {
        name: status.status.name,
        distribution,
      };
    }) ?? [];

  const taskStatusDistributionComplete = {
    name: status_pool?.complete.name ?? "complete",
    distribution: tasks.filter((t) => t.status.category === "complete").length,
  };

  const taskStatusDistribution = taskStatusDistributionIncomplete.concat(
    taskStatusDistributionComplete
  );

  const chartConfig = {
    contribution: {
      label: "Contribution",
    },
  } satisfies ChartConfig;

  function generateChartConfig(data: { name: string; distribution: number }[]) {
    const chartConfigNew = data.map((item, index) => ({
      [item.name.toLowerCase()]: {
        label: item.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      },
    }));
    return Object.assign(chartConfig, ...chartConfigNew);
  }

  const finalchartConfig = generateChartConfig(taskStatusDistribution);
  console.log(finalchartConfig);

  const finaltaskStatusDistribution = taskStatusDistribution.map((item) => {
    return { ...item, fill: `var(--color-${item.name})` };
  });
  console.log(finaltaskStatusDistribution);
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>任务状态</CardTitle>
        <CardDescription>项目任务状态总览</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={finalchartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={finaltaskStatusDistribution}
              dataKey="distribution"
              nameKey="name"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          请关注当前项目任务状态
        </div>
      </CardFooter>
    </Card>
  );
}
