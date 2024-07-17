"use client";

import ContributionDistribution from "@/components/project-dashboard/ContributionDistribution";
import IncompletedTaskTable from "@/components/project-dashboard/IncompletedTaskTable";
import NewDraft from "@/components/project-dashboard/NewDraft";
import NewRequirement from "@/components/project-dashboard/NewRequirement";
import TaskDistribution from "@/components/project-dashboard/TaskDistribution";
import { Card, CardContent } from "@/components/ui/card";
import TaskTime from "@/components/project-dashboard/TaskTime";
import { Label } from "@/components/ui/label";

export default function DashboardPage({
  params: { project_id },
}: {
  params: { project_id: string };
}) {
  return (
    <div className="flex flex-col">
      <h2 className="mb-2">项目仪表盘</h2>
      <div>
        <Card className="border-none">
          <CardContent className="flex gap-8 justify-between">
            <ContributionDistribution
              className="flex-1"
              project_id={project_id}
            />
            <TaskTime projectId={project_id} className="flex-1" />
            <TaskDistribution className="flex-1" projectId={project_id} />
          </CardContent>
        </Card>
      </div>
      <div className="flex">
        <Card className="border-none flex w-[65vw]">
          <CardContent className="w-full">
            <IncompletedTaskTable project_id={project_id} />
          </CardContent>
        </Card>
        <Card className="border-none">
          <CardContent className="flex flex-col gap-4">
            <NewDraft projectId={project_id} className={""} />
            <NewRequirement projectId={project_id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
