import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/users/,{user_id},/drafts] */

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

export default function useUserDrafts(user_id: string) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error, isLoading, mutate } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取用户草稿"))
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
