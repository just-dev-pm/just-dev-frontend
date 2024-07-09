'use client'

import AgendaItemCard from "@/app/(home)/components/agendaItemCard";

interface IProps {
  params: { agenda_item_id: string };
}
export default function AgendaItemPage({ params }: IProps) {
  const { agenda_item_id } = params;
  return <div className="">
    <AgendaItemCard ></AgendaItemCard>
  </div>;
}
