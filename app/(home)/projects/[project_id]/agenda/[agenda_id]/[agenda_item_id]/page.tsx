'use client'

import AgendaItemCard from "@/app/(home)/agenda/components/agendaItemCard";
import useEvent from "@/app/api/event/get-events";
import Loading from "@/components/ui/loading";
import { agenda_items_data } from "@/lib/Mockdata";

type event_res = {
  description: string;
  end_time: string;
  id: string;
  name: string;
  participants: Participant[];
  start_time: string;
};

type Participant = {
  id: string;
};

interface IProps {
  params: { agenda_id: string; agenda_item_id: string };
}

export default function AgendaItemPage({ params }: IProps) {
  const { agenda_id,agenda_item_id } = params;
  const { data, error } = useEvent({ agenda_id });

  if (data.events.length === 0) {
    return <Loading />;
  }
  const events: event_res[] = data.events;
  const cardData = events.find(
    (event: event_res) => event.id === agenda_item_id
  );
  return <div className="">
        <AgendaItemCard
        title={cardData!.name}
        description={cardData!.description}
        start_time={cardData!.start_time}
        end_time={cardData!.end_time}
        participants={cardData!.participants}
      ></AgendaItemCard>
</div>;
}
