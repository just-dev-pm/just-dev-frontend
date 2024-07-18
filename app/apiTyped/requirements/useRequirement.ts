import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/requirements/,{requirement_id}] */

import * as z from "zod";

export const ResponseSchema = z.object({
  content: z.string(),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useRequirement(
  project_id: string,
  requirement_id: string,
) {
  const urlPrefix = `/api/projects/`;
  const urlMitfix = `/requirements/`;
  const { data, error, isLoading, mutate } = useSWR(
    project_id && requirement_id
      ? [urlPrefix, project_id, urlMitfix, requirement_id]
      : null,
    ([urlPrefix, project_id, urlMitfix, requirement_id]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlMitfix + requirement_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取需求"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { id: "", name: "", content: "" } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
