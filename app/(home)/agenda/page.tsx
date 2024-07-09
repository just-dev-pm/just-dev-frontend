"use client";

import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { events } from "@/lib/Mockdata";
import { Label } from "@/components/ui/label";
import AgendaDataSheeet from "../components/AgendaDataSheet";
import { agenda_calendar } from "@/lib/Mockdata";

const localizer = momentLocalizer(moment);

export function Calendar(props: Omit<CalendarProps, "localizer">) {
  return <BigCalendar {...props} localizer={localizer}></BigCalendar>;
}

export default function AgendaPage() {
  return <div>
    <div style={{height:"88vh"}} className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Label className="text-xl font-bold">日程总览</Label>
        <AgendaDataSheeet calendars={agenda_calendar}></AgendaDataSheeet>
      </div>
      <Calendar
        events={events}
        views={["month", "week", "day"]}
      ></Calendar>
    </div>
  </div>;
}
