/** @key [/api/users/,{user_id},/agendas] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

import * as z from "zod";


export const EventSchema = z.object({
    "id": z.string(),
});
export type Event = z.infer<typeof EventSchema>;

export const AgendaSchema = z.object({
    "events": z.array(EventSchema),
    "id": z.string(),
    "name": z.string(),
});
export type Agenda = z.infer<typeof AgendaSchema>;

export const ResponseSchema = z.object({
    "agendas": z.array(AgendaSchema),
});
export type Response = z.infer<typeof ResponseSchema>;


export default function useUserAgenda(user_id: string) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/agendas`;
  const { data, error, mutate, isLoading } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取用户日程"))
        .then((res) => res.json())
        .then(res => ResponseSchema.parse(res)),
    {
      fallbackData: { agendas: [] },
    },
  );
  return { data, error, mutate, isLoading };
}
