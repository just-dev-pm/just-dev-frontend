"use client";

import { events } from "@/lib/Mockdata";
import { Label } from "@/components/ui/label";
import AgendaDataSheeet from "../components/AgendaDataSheet";
import { agenda_calendar } from "@/lib/Mockdata";
import Calendar from "./components/calendar";

export default function AgendaPage() {
  return (
    <div>
      <div style={{ height: "88vh" }} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-xl font-bold">日程总览</Label>
          <AgendaDataSheeet calendars={agenda_calendar}></AgendaDataSheeet>
        </div>
        <Calendar events={events} views={["month", "week", "day"]} />
      </div>
    </div>
  );
}
