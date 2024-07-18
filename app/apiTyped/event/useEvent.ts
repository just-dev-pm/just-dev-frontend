/** @key [/api/agendas/,{agenda_id},/events] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

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

export const ResponseSchema = z.object({
  events: z.array(EventSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useEvent(agenda_id: string) {
  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events`;
  const { data, error, isLoading, mutate } = useSWR(
    agenda_id ? [urlPrefix, agenda_id, urlSuffix] : null,
    ([urlPrefix, agenda_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取事件"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { fallbackData: { events: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
