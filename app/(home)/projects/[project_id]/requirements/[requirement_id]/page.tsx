"use client";

import RequirementItemCard from "../components/requirmentItemCard";
import useRequirement from "@/app/api/requirements/get-requirement";
import Loading from "@/components/ui/loading";
import { requirment_items_data } from "@/lib/Mockdata";
import { RequirementController } from "../components/inline-input-form";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeRequirementContextProvider } from "../components/change-requirement-context";
interface IProps {
  params: {
    project_id: string;
    requirement_id: string;
  };
}
export default function RequirementPage({ params }: IProps) {
  const { project_id, requirement_id } = params;
  const { data, error } = useRequirement({ project_id, requirement_id });

  if (!data) return <Loading />;

  return (
    <Card>
      {/* <RequirementItemCard title={data.name} description={data.content}></RequirementItemCard> */}
      <CardContent className="w-[33vw] p-8 pb-18">
        <ChangeRequirementContextProvider initialRequirment={data}>
          <RequirementController />
        </ChangeRequirementContextProvider>
      </CardContent>
    </Card>
  );
}
