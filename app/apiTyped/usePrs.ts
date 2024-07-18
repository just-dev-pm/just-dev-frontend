/** @key [/api/projects/,{project_id},/prs] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

import * as z from "zod";

export const PrSchema = z.object({
  owner: z.string(),
  pull_number: z.number(),
  repo: z.string(),
  title: z.string(),
});
export type Pr = z.infer<typeof PrSchema>;

export const ResponseSchema = z.object({
  prs: z.array(PrSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function usePrs(project_id: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/prs`;
  const { data, error, isLoading, mutate } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取prs"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { fallbackData: { prs: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
