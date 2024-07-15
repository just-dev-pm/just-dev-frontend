"use client";

import Calendar from "@/app/(home)/agenda/components/calendar";
import AgendaDataSheeet from "@/app/(home)/agenda/components/AgendaDataSheet";
import useProjectAgenda from "@/app/api/agenda/get-project-agenda";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { agenda_calendar, events } from "@/lib/Mockdata";

type agenda = {
  id: string;
  name: string;
  events: {event_id:string}[]
}

type IProps = {
  params:{project_id:string}
}

export default function AgendaPage({params}:IProps) {
  const {project_id} = params;
  const {data,error} = useProjectAgenda({project_id})

  if(!data) return <Loading />

  const agendas = data.agendas;
  let idsAndNames:{id:string,name:string}[] = [];
  let event_ids:{event_id:string}[] = []; 
  if(agendas){
    agendas.map((agenda: agenda) => {
      idsAndNames.push({id:agenda.id,name:agenda.name})
      event_ids = event_ids.concat(agenda.events)
    })
  }
  return (
    <div>
      <div style={{ height: "88vh" }} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-xl font-bold">日程总览</Label>
          <AgendaDataSheeet calendars={idsAndNames} project={{
            isProject: true,
            project_id: project_id
          }}></AgendaDataSheeet>
        </div>
        <Calendar events={events} views={["month", "week", "day"]}></Calendar>
      </div>
    </div>
  );
}
