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
import useSWR from "swr";
import { isDeepStrictEqual } from "util";

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
    const { data, error, isLoading } = useSWR(
        agenda_ids ? agenda_ids.join("-") : null,
        async () => {
            const promises = agenda_ids
                .map((id) => ({
                    url: `/api/agendas/${id}/events`,
                    agendaId: id,
                }))
                .map(async ({ url, agendaId }) => {
                    const events = await fetch(`${BASE_URL}${url}`)
                        .then(handleResponse())
                        .then((data) => {
                            return data.json();
                        })
                        .then((data) => {
                            const typed =
                                GetAgendaEventsResponseSchema.parse(data);
                            return typed;
                        });
                    return { agendaId, events: events.events };
                });
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
    const user_id = useUserStore.getState().userId;
    const { data: userAgendas } = useUserAgenda({ user_id });
    const typedUserAgendas = userAgendas as GetUserAgendasResponse;
    const {
        data: agendasEvents,
        error: agendasEventsError,
        isLoading: agendasEventsIsLoading,
    } = useAgendaEventSWR(
        typedUserAgendas
            ? typedUserAgendas.agendas.map((agenda) => agenda.id)
            : []
    );

    if (agendasEventsIsLoading) return <>loading</>;

    if (agendasEventsError) return <>Error</>;

    if (agendasEvents) {
        return (
            <Calendar
                events={agendaEventsToRenderedEvents(agendasEvents)}
                views={["month", "week", "day"]}
            />
        );
    }
}
