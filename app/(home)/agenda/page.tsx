"use client";

import { events } from "@/lib/Mockdata";
import { Label } from "@/components/ui/label";
import AgendaDataSheeet from "../components/AgendaDataSheet";
import { agenda_calendar } from "@/lib/Mockdata";
import Calendar from "./components/calendar";
import useUserAgenda from "@/app/api/agenda/get-user-agenda";
import { useUserStore } from "@/store/userStore";
import Loading from "@/components/ui/loading";

type agenda = {
  id: string;
  name: string;
  events: {event_id:string}[]
}


export default function AgendaPage() {
  const userId = useUserStore(stats => stats.userId);
  const {data,error} = useUserAgenda({user_id:userId})

  if(!data) return <Loading />

  const agendas = data.agendas;
  let idsAndNames:{id:string,name:string}[] = [];
  let event_ids:{event_id:string}[] = []; 

  agendas.map((agenda: agenda) => {
    idsAndNames.push({id:agenda.id,name:agenda.name})
    event_ids = event_ids.concat(agenda.events)
  })

  return (
    <div>
      <div style={{ height: "88vh" }} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-xl font-bold">日程总览</Label>
          <AgendaDataSheeet calendars={idsAndNames}></AgendaDataSheeet>
        </div>
        <Calendar events={events} views={["month", "week", "day"]} />
      </div>
    </div>
  );
}
