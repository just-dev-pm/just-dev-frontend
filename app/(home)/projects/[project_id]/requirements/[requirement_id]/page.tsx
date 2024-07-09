'use client'

import RequirementItemCard from "@/app/(home)/components/requirmentItemCard";
import { requirment_items_data } from "@/lib/Mockdata";
interface IProps {
  params:{requirement_id: string};
}
export default function RequirementPage({ params }: IProps) {
  const {requirement_id} = params
  const mockData = requirment_items_data[parseInt(requirement_id)];
  return <div>
    <RequirementItemCard title={mockData.name} description={mockData.content}></RequirementItemCard>
  </div>;
}
