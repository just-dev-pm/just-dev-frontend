"use client";

import { Calendar } from "../page";
// import WithDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { ViewProps } from "react-big-calendar";
import { events } from "@/lib/Mockdata";

interface IProps {
  params: { agenda_id: string };
}

export default function ConcreteAgendaPage({ params }: IProps) {
  //const DnDCalendar = WithDragAndDrop(BasicCalendar);
  return (
    <div style={{ height: "90vh" }}>
      <Calendar events={events} views={["month", "week", "day"]}></Calendar>
    </div>
  );
}
