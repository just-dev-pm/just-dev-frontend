"use client";

import ContributionDistribution from "@/components/project-dashboard/ContributionDistribution";
import IncompletedTaskTable from "@/components/project-dashboard/IncompletedTaskTable";
import NewDraft from "@/components/project-dashboard/NewDraft";
import NewRequirement from "@/components/project-dashboard/NewRequirement";

export default function DashboardPage({
    params: { project_id },
}: {
    params: { project_id: string };
}) {
    return (
        <div className="space-y-4">
            <div></div>
            <div className="flex items-start">
                <div></div>
                <div>
                    <NewDraft projectId={project_id} />
                    <NewRequirement projectId={project_id} />
                    <IncompletedTaskTable project_id={project_id} />
                    {/* <ContributionDistribution project_id={project_id} /> */}
                </div>
            </div>
        </div>
    );
}
