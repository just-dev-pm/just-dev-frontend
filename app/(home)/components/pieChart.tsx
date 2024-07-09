import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { pieChartData, pieChartConfig } from "@/lib/Mockdata";
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
import { cn } from "@/lib/utils";

const chartData = pieChartData;
const chartConfig: ChartConfig = pieChartConfig;

type Props = {
  className?: string;
  title?: string;
  description?: string;
  footerText?: string;
  name?:string;
  data?:string;
};

export function JustDevPieChart({
  className,
  title = "Bar Chart - Stacked + Legend",
  description = "January - June 2024",
  footerText = "Showing total visitors for the last 6 months",
  name = 'browser',
  data = 'visitors'
}: Props) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey={data} label nameKey={name} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {footerText}
        </div>
      </CardFooter>
    </Card>
  );
}
