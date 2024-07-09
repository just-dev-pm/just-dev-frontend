import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { JustDevBarChart } from "./barChart";
import { JustDevPieChart } from "./pieChart";
import { JustDevLineChart } from "./lineChart";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function ChartCard(){
    return (
        <Card>
            <CardHeader>
                <CardTitle className=" flex justify-end"><Button><PlusIcon></PlusIcon></Button></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <JustDevBarChart className="flex-1" title="你这个月有多少次没按时完成任务"></JustDevBarChart>
                <JustDevPieChart className="flex-1" ></JustDevPieChart>
                <JustDevLineChart className="flex-1" title="你这一年为公司做了多少贡献"></JustDevLineChart>
            </CardContent>
            {/* <CardFooter>

            </CardFooter> */}
        </Card>
    )
}