'use client'

import { RequirementsTable } from "@/app/(home)/projects/[project_id]/requirements/components/requirementsTable";
import useProjectRequirements from "@/app/api/requirements/get-project-requirements";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RequirementDialog } from "./components/requirementDialogButton";

type IProps = {
  params:{project_id:string}
}

export default function RequirementsPage({params}:IProps) {
  const {project_id} = params;
  return <div>
    <div className="flex justify-between">
      <Label className="text-xl font-bold">需求总览</Label>
      <RequirementDialog project_id={project_id}></RequirementDialog>
    </div>

    <RequirementsTable project_id={project_id}></RequirementsTable>
  </div>

}
