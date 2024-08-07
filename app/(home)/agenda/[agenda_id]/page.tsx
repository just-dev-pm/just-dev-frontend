"use client";

import Calendar from "../components/calendar";
// import WithDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import useAgenda from "@/app/api/agenda/get-agenda";
import useEvent from "@/app/api/event/get-events";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { AddEventContextProvider } from "../components/add-event/context";
import EventDialog from "../components/eventDialog";
import useEventAdd from "@/app/api/event/add-event";
import { mutate } from "swr";

interface IProps {
  params: { agenda_id: string };
}

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

type event = {
  title: string;
  start: Date;
  end: Date;
  id: string;
  data: {
    agenda_id: string;
    description: string;
    participants: Participant[];
  };
};

export default function ConcreteAgendaPage({ params }: IProps) {
  const { agenda_id } = params;
  //const DnDCalendar = WithDragAndDrop(BasicCalendar);

  const router = useRouter();
  const {trigger} = useEventAdd({agenda_id})
  const {
    data: agenda_data,
    error: agenda_error,
    isLoading: agenda_loading,
  } = useAgenda({ agenda_id });
  const agenda_name = agenda_data.name;

  const {
    data: event_data,
    error: event_error,
    isLoading: event_loading,
  } = useEvent({ agenda_id });
  const events = event_data.events;
  let events_new: event[] = [];

  events.map((event: event_res) => {
    const startDate = moment(
      event.start_time,
      "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
    ).toDate();
    const endDate = moment(
      event.end_time,
      "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
    ).toDate();
    let event_new = {
      id: event.id,
      title: event.name,
      start: startDate,
      end: endDate,
      data: {
        agenda_id: agenda_id,
        description: event.description,
        participants: event.participants,
      },
    };
    events_new.push(event_new);
  });

  const handleEventClick = (event: event) => {
    router.push(`./${agenda_id}/${event.id}`);
  };

  function handleEventAdd(event:event_res){
    trigger(event);
    mutate(["/api/agendas/",agenda_id,"/events"]);
  }

  if (!agenda_data || agenda_loading || event_loading) return <Loading />;

  return (
    <div style={{ height: "80vh" }}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2>个人具体日程</h2>
          <Label className="text-lg font-bold">{agenda_name}</Label>
        </div>
        <AddEventContextProvider handleEventAdd={handleEventAdd}>
          <EventDialog
            project={{
              isProject: false,
              project_id: "",
            }}
            className=""
          >
            新增事件
          </EventDialog>
        </AddEventContextProvider>
      </div>

      <Calendar
        events={events_new}
        views={["month", "week", "day"]}
        onSelectEvent={(event) => {
          handleEventClick(event as any);
        }}
        className="mt-4"
      ></Calendar>
      <div className="flex justify-end mt-5">
        <Button>
          <Link href={`./`}>返回</Link>
        </Button>
      </div>
    </div>
  );
}
