"use client";

import ContributionDistribution from "@/components/project-dashboard/ContributionDistribution";
import IncompletedTaskTable from "@/components/project-dashboard/IncompletedTaskTable";
import NewDraft from "@/components/project-dashboard/NewDraft";
import NewRequirement from "@/components/project-dashboard/NewRequirement";
import TaskDistribution from "@/components/project-dashboard/TaskDistribution";
import { Card, CardContent } from "@/components/ui/card";
import TaskTime from "@/components/project-dashboard/TaskTime";

export default function DashboardPage({
  params: { project_id },
}: {
  params: { project_id: string };
}) {
  return (
    <div>
      <Card className="border-none">
        <CardContent className="flex gap-8 justify-between">
          <ContributionDistribution
            className="flex-1"
            project_id={project_id}
          />
          <TaskDistribution className="flex-1" projectId={project_id} />
        </CardContent>
      </Card>
      <NewDraft projectId={project_id} />
      <NewRequirement projectId={project_id} />
      <IncompletedTaskTable project_id={project_id} />
    </div>
  );
}
