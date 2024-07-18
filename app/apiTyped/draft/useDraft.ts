import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/drafts/,{draft_id}] */

import * as z from "zod";

export const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useDraft(draft_id: string) {
  const urlPrefix = `/api/drafts/`;
  const { data, error, isLoading, mutate } = useSWR(
    draft_id ? [urlPrefix, draft_id] : null,
    ([urlPrefix, project_id]) =>
      fetch(BASE_URL + urlPrefix + project_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取草稿"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { id: "", name: "" } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
