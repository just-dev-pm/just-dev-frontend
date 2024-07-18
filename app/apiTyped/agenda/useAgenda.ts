/** @key [/api/agendas/,{agenda_id}] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

import * as z from "zod";

export const EventSchema = z.object({
  id: z.string(),
});
export type Event = z.infer<typeof EventSchema>;

export const ResponseSchema = z.object({
  events: z.array(EventSchema),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useAgenda(agenda_id: string) {
  const urlPrefix = `/api/agendas/`;
  const { data, error, isLoading, mutate } = useSWR(
    agenda_id ? [urlPrefix, agenda_id] : null,
    ([urlPrefix, agenda_id]) =>
      fetch(BASE_URL + urlPrefix + agenda_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取日程"))
        .then((res) => res.json())
        .then(res => ResponseSchema.parse(res)),
    { fallbackData: { id: "", name: "", events: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
