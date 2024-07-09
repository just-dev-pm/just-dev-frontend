"use client";

import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export function Calendar(props: Omit<CalendarProps, "localizer">) {
  return <BigCalendar {...props} localizer={localizer}></BigCalendar>;
}

export default function AgendaPage() {
  return <div>Agenda</div>;
}
