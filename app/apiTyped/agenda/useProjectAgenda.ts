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



/** @key [/api/projects/,{project_id},/agendas] */
export default function useProjectAgenda(project_id: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/agendas`;
  const { data, error, mutate, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目日程"))
        .then((res) => res.json())
        .then(res => ResponseSchema.parse(res)),
    { fallbackData: { agendas: [] } },
  );
  return { data, error, mutate, isLoading };
}
