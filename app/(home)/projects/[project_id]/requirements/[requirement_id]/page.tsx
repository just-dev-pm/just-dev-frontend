"use client";

import RequirementItemCard from "../components/requirmentItemCard";
import useRequirement from "@/app/api/requirements/get-requirement";
import Loading from "@/components/ui/loading";
import { requirment_items_data } from "@/lib/Mockdata";
import { RequirementController } from "../components/inline-input-form";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeRequirementContextProvider } from "../components/change-requirement-context";
import { useRequirementsChange } from "@/app/api/requirements/change-requirement";
interface IProps {
  params: {
    project_id: string;
    requirement_id: string;
  };
}
export default function RequirementPage({ params }: IProps) {
  const { project_id, requirement_id } = params;
  const { data, error,isLoading } = useRequirement({ project_id, requirement_id });
  const { trigger } = useRequirementsChange({ project_id, requirement_id });

  if (!data || isLoading) return <Loading />;

  return (
    <Card>
      {/* <RequirementItemCard title={data.name} description={data.content}></RequirementItemCard> */}
      <CardContent className="w-[33vw] p-8 pb-18">
        <ChangeRequirementContextProvider initialRequirment={data} handleSubmit={trigger}>
          <RequirementController />
        </ChangeRequirementContextProvider>
      </CardContent>
    </Card>
  );
}
