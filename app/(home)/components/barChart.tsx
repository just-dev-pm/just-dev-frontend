"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { barChartData, barChartConfig } from "@/lib/Mockdata";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartData = barChartData;
const chartConfig: ChartConfig = barChartConfig;

type Props = {
  className?: string;
  title?: string;
  description?: string;
  footerText?: string;
  xAxis?:string;
  data1?:string;
  data2?:string;
};

export function JustDevBarChart({
  className,
  title="Bar Chart - Stacked + Legend",
  description="January - June 2024",
  footerText="Showing total visitors for the last 6 months",
  data1="on_time",
  data2="time_out",
  xAxis="month",
}: Props) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxis}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={data1}
              stackId="a"
              fill={`var(--color-${data1})`}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey={data2}
              stackId="a"
              fill={`var(--color-${data2})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {footerText}
        </div>
      </CardFooter>
    </Card>
  );
}
