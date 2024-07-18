import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/projects/,{project_id}],/drafts */

import * as z from "zod";

export const DraftSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Draft = z.infer<typeof DraftSchema>;

export const ResponseSchema = z.object({
  drafts: z.array(DraftSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useProjectDrafts(project_id: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/drafts`;
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
        .then(handleResponse("获取项目草稿"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { drafts: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
