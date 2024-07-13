'use client'

import RequirementItemCard from "../components/requirmentItemCard";
import useRequirement from "@/app/api/requirements/get-requirement";
import Loading from "@/components/ui/loading";
import { requirment_items_data } from "@/lib/Mockdata";
interface IProps {
  params:{
    project_id:string
    requirement_id: string};
}
export default function RequirementPage({ params }: IProps) {
  const {project_id,requirement_id} = params
  const {data,error} = useRequirement({project_id,requirement_id});

  if(!data) return <Loading />

  return <div>
    <RequirementItemCard title={data.name} description={data.content}></RequirementItemCard>
  </div>;
}
