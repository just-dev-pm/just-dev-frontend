'use client'

import AgendaItemCard from "@/app/(home)/components/agendaItemCard";
import { agenda_items_data } from "@/lib/Mockdata";




interface IProps {
  params: { agenda_item_id: string };
}
export default function AgendaItemPage({ params }: IProps) {

  const { agenda_item_id } = params;
  const mockData = agenda_items_data[parseInt(agenda_item_id)]
  
  return <div className="">
    <AgendaItemCard title={mockData.title} description={mockData.description} time={mockData.time} place={mockData.place} ></AgendaItemCard>
  </div>;
}
