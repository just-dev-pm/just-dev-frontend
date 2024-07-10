"use client";

import { Calendar } from "../page";
// import WithDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { events } from "@/lib/Mockdata";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  params: { agenda_id: string };
}

type event = {
  title: string;
  start: Date;
  end: Date;
  id: string;
};

export default function ConcreteAgendaPage({ params }: IProps) {
  const { agenda_id } = params;
  //const DnDCalendar = WithDragAndDrop(BasicCalendar);

  const router = useRouter();

  const handleEventClick = (event: event) => {
    router.push(`./${agenda_id}/${event.id}`);
    console.log(event.title);
  };

  return (
    <div style={{ height: "90vh" }}>
      <Calendar
        events={events}
        views={["month", "week", "day"]}
        onSelectEvent={handleEventClick}
      ></Calendar>
      <div className="flex justify-end mt-5">
        <Button><Link href={`./`}>返回</Link></Button>
      </div>
    </div>
  );
}
