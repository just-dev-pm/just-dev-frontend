"use client";

import { Label } from "@/components/ui/label";
import AgendaDataSheeet from "./components/AgendaDataSheet";
import Calendar from "./components/calendar";
import useUserAgenda from "@/app/api/agenda/get-user-agenda";
import { useUserStore } from "@/store/userStore";
import Loading from "@/components/ui/loading";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import moment from "moment";
import useAgenda from "@/app/api/agenda/get-agenda";
import * as z from "zod";

export const ParticipantSchema = z.object({
    id: z.string(),
});
export type Participant = z.infer<typeof ParticipantSchema>;

export const EventSchema = z.object({
    description: z.string(),
    end_time: z.string(),
    id: z.string(),
    name: z.string(),
    participants: z.array(ParticipantSchema),
    start_time: z.string(),
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

function agendasToRenderedEvents(
    event: {
        agenda: string;
        events: Event[];
    }[]
): RenderedEvent[] {
    return event.flatMap((agenda) =>
        agenda.events.map((event) => ({
            title: event.name,
            start: new Date(event.start_time),
            end: new Date(event.end_time),
            id: event.id,
            data: {
                agenda_id: agenda.agenda,
                description: event.description,
                participants: event.participants,
            },
        }))
    );
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

export default function AgendaPage() {
    const user_id = useUserStore.getState().userId;
    const { data, error, isLoading } = useUserAgenda({ user_id });

    const [agendas, setAgendas] = useState<
        { agenda: string; events: Event[] }[]
    >([]);

    if (isLoading) return <>Loading</>;

    if (error) return <>Error: {error}</>;

    if (data) {
        if (GetUserAgendasResponseSchema.parse(data)) {
            const agendaIds = GetUserAgendasResponseSchema.parse(
                data
            ).agendas.map((agenda) => agenda.id);
            return (
                <>
                    {agendaIds.map((agendaId) => (
                        <AgendaEventsProvider
                            key={agendaId}
                            agendaId={agendaId}
                            setEvents={(events) => {
                                setAgendas((agendas) => [
                                    ...agendas.filter(
                                        (agenda) => agenda.agenda != agendaId
                                    ),
                                    { agenda: agendaId, events },
                                ]);
                            }}
                        />
                    ))}
                    <Calendar
                        events={agendasToRenderedEvents(agendas)}
                        views={["month", "week", "day"]}
                    />
                </>
            );
        }
    }

    return <>Data parsing error</>;
}

function AgendaEventsProvider({
    agendaId,
    setEvents,
}: {
    agendaId: string;
    setEvents: (events: Event[]) => void;
}) {
    const { data, error, isLoading } = useAgenda({ agenda_id: agendaId });

    if (!isLoading && !error && data) {
        if (GetAgendaEventsResponseSchema.parse(data)) {
            const events = GetAgendaEventsResponseSchema.parse(data).events;
            setEvents(data);
        }
    }

    return null;
}
