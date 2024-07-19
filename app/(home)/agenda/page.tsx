"use client";

import AgendaDataSheeet from "./components/AgendaDataSheet";
import Calendar from "./components/calendar";
import useUserAgenda from "@/app/api/agenda/get-user-agenda";
import { useUserStore } from "@/store/userStore";
import Loading from "@/components/ui/loading";
import { useMemo, useState } from "react";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import * as z from "zod";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export const ParticipantSchema = z.object({
  id: z.string(),
});
export type Participant = z.infer<typeof ParticipantSchema>;

export const EventSchema = z.object({
  description: z.string(),
  end_time: z.coerce.date(),
  id: z.string(),
  name: z.string(),
  participants: z.array(ParticipantSchema),
  start_time: z.coerce.date(),
});
export type Event = z.infer<typeof EventSchema>;

export const GetAgendaEventsResponseSchema = z.object({
  events: z.array(EventSchema),
});
export type GetAgendaEventsResponse = z.infer<
  typeof GetAgendaEventsResponseSchema
>;

type RenderedEvent = {
  title: string;
  start: Date;
  end: Date;
  id: string;
  data: {
    agenda_id: string;
    description: string;
    participants: { id: string }[];
  };
};

function agendaEventsToRenderedEvents(
  agendaEvents: {
    agendaId: string;
    events: {
      id: string;
      description: string;
      end_time: Date;
      name: string;
      participants: {
        id: string;
      }[];
      start_time: Date;
    }[];
  }[]
): RenderedEvent[] {
  const events: RenderedEvent[] = [];
  agendaEvents.forEach((agenda) => {
    agenda.events.forEach((event) => {
      events.push({
        title: event.name,
        start: event.start_time,
        end: event.end_time,
        id: event.id,
        data: {
          agenda_id: agenda.agendaId,
          description: event.description,
          participants: event.participants,
        },
      });
    });
  });
  return events;
}

export const EventIdSchema = z.object({
  id: z.string(),
});
export type EventId = z.infer<typeof EventIdSchema>;

export const AgendaSchema = z.object({
  events: z.array(EventIdSchema),
  id: z.string(),
  name: z.string(),
});
export type Agenda = z.infer<typeof AgendaSchema>;

export const GetUserAgendasResponseSchema = z.object({
  agendas: z.array(AgendaSchema),
});
export type GetUserAgendasResponse = z.infer<
  typeof GetUserAgendasResponseSchema
>;

function useAgendaEventSWR(agenda_ids: string[]) {
  console.log("agenda_ids",agenda_ids)
  const { data, error, isLoading } = useSWR(
    agenda_ids ? agenda_ids.join("-") : null,
    async () => {
      const promises = agenda_ids
        .map((id) => ({
          url: `/api/agendas/${id}/events`,
          agendaId: id,
        }))
        .map(async ({ url, agendaId }) => {
          const events = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            },
            credentials: "include"
          })
            .then(handleResponse())
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              const typed = GetAgendaEventsResponseSchema.parse(data);
              return typed;
            });
          return { agendaId, events: events.events };
        });
      // console.log(promises);
      return Promise.all(promises);
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}

export default function AgendaPage() {
  const [calendars, setCalendars] = useState<{ id: string; name: string }[]>(
    []
  );
  const [switchState, setSwitchState] = useState<
    { id: string; checked: boolean }[]
  >([]);
  const router = useRouter();
  const user_id = useUserStore.getState().userId;
  const { data: userAgendas } = useUserAgenda({ user_id });
  const typedUserAgendas = userAgendas as GetUserAgendasResponse;
  const {
    data: agendasEvents,
    error: agendasEventsError,
    isLoading: agendasEventsIsLoading,
  } = useAgendaEventSWR(
    typedUserAgendas ? typedUserAgendas.agendas.map((agenda) => agenda.id) : []
  );
  let filteredAgendasEvents: {
    agendaId: string; events: {
      id: string;
      description: string;
      end_time: Date;
      name: string;
      participants: {
        id: string;
      }[];
      start_time: Date;
    }[];
  }[] = [];
  const handleEventClick = (event: RenderedEvent) => {
    router.push(`./agenda/${event.data.agenda_id}/${event.id}`);
  };
  useMemo(() => {
    if (typedUserAgendas && typedUserAgendas.agendas) {
      typedUserAgendas.agendas.forEach((agenda) => {
        setCalendars((prevCalendars) => {
          // Check if the agenda with the same id already exists in calendars
          const existingIndex = prevCalendars.findIndex((item) => item.id === agenda.id);
      
          if (existingIndex !== -1) {
            // If exists, update the item
            const updatedCalendars = [...prevCalendars];
            updatedCalendars[existingIndex] = { id: agenda.id, name: agenda.name };
            return updatedCalendars;
          } else {
            // If not exists, add new item
            return [...prevCalendars, { id: agenda.id, name: agenda.name }];
          }
        });
        setSwitchState((prevSwitchState) => {
          // Check if the agenda with the same id already exists in switchState
          const existingIndex = prevSwitchState.findIndex((item) => item.id === agenda.id);
      
          if (existingIndex !== -1) {
            // If exists, update the item
            const updatedSwitchState = [...prevSwitchState];
            updatedSwitchState[existingIndex] = { id: agenda.id, checked: true };
            return updatedSwitchState;
          } else {
            // If not exists, add new item
            return [...prevSwitchState, { id: agenda.id, checked: true }];
          }
        });
      });
    }
  }, [typedUserAgendas]);

  if (agendasEventsIsLoading) return <Loading />;

  if (agendasEventsError) return <>Error</>;

  if (agendasEvents) {
    filteredAgendasEvents = agendasEvents!.filter((event) =>
      switchState.some(
        (state) => state.id === event.agendaId && state.checked === true
      )
    );

  }
  return (
    <div className="h-[90vh]">
      <div className="flex justify-between">
        <h2>个人总日程</h2>
        <AgendaDataSheeet
          calendars={calendars}
          switchState={switchState}
          setSwitchState={setSwitchState}
          setCalendars={setCalendars}
          project={{
            isProject: false,
            project_id: "",
          }}
        ></AgendaDataSheeet>
      </div>
      <Calendar
        className="mt-4"
        events={agendaEventsToRenderedEvents(filteredAgendasEvents)}
        views={["month", "week", "day"]}
        onSelectEvent={(event) => {
          handleEventClick(event as any);
        }}
      />
    </div>
  );
}
