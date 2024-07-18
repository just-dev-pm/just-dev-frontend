"use client";

import AgendaItemCard from "@/app/(home)/agenda/components/agendaItemCard";
import useEventDelete from "@/app/apiTyped/event/useEventDelete";
import useEvent from "@/app/apiTyped/event/useEvent";
import Loading from "@/components/ui/loading";

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
  const { agenda_id, agenda_item_id } = params;
  const { data, error, isLoading } = useEvent(agenda_id);
  const { trigger } = useEventDelete(agenda_id,agenda_item_id);

  if (isLoading) {
    return <Loading />;
  }
  if(error){
    return <>Error</>
  }
  const events = data.events;
  const cardData = events.find(
    (event) => event.id === agenda_item_id
  );
  if(cardData){
    return (
      <div className="">
        <AgendaItemCard
          title={cardData.name}
          description={cardData.description}
          start_time={cardData.start_time}
          end_time={cardData.end_time}
          participants={cardData.participants}
          handleDelete={trigger}
        ></AgendaItemCard>
      </div>
    );
  }
}
