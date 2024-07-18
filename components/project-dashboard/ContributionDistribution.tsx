"use client";

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
import useProjectTasks from "@/app/apiTyped/task/useProjectTasks";
import useUsersInProject from "@/app/apiTyped/project/useUserInProject";
import { cn } from "@/lib/utils";
import Loading from "../ui/loading";

export default function ContributionDistribution({
  project_id,
  className = "",
}: {
  project_id: string;
  className?: string;
}) {
  const { data: project_users,error: project_error , isLoading:project_isLoading } = useUsersInProject(project_id);

  const { data, error, isLoading } = useProjectTasks(project_id);

  if (error || project_error) return <>Error {error}</>;
  if (isLoading || project_isLoading) return <Loading />;

  const tasks = data.tasks.filter(
    (task) => task.status.category === "complete"
  );

  const users = project_users.users;

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

  function generateChartConfig(data: { name: string; contribution: number }[]) {
    const chartConfigNew = data.map((item, index) => ({
      [item.name.toLowerCase()]: {
        label: item.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      },
    }));
    return Object.assign(chartConfig, ...chartConfigNew);
  }

  const finalchartConfig = generateChartConfig(user_contributions);

  const finaluserStatusDistribution = user_contributions.map((item) => {
    return { ...item, fill: `var(--color-${item.name})` };
  });

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>成员贡献</CardTitle>
        <CardDescription>成员贡献总览</CardDescription>
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
              data={finaluserStatusDistribution}
              dataKey="contribution"
              nameKey="name"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            请关注各成员对项目的贡献度
          </div>
        </CardFooter>
    </Card>
  );
}
