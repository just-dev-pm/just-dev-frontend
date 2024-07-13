"use client";

import Calendar from "@/app/(home)/agenda/components/calendar";
import AgendaDataSheeet from "@/app/(home)/components/AgendaDataSheet";
import { Label } from "@/components/ui/label";
import { agenda_calendar, events } from "@/lib/Mockdata";

export default function AgendaPage() {
  return (
    <div>
      <div style={{ height: "88vh" }} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-xl font-bold">日程总览</Label>
          <AgendaDataSheeet calendars={agenda_calendar}></AgendaDataSheeet>
        </div>
        <Calendar events={events} views={["month", "week", "day"]}></Calendar>
      </div>
    </div>
  );
}
