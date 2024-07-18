import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

import * as z from "zod";

export const ResponseSchema = z.object({
  invitor_id: z.string(),
  project_name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useInvitationInfo(token_id: string) {
  const urlPrefix = `/api/invitation/`;
  const { data, error, isLoading, mutate } = useSWR(
    [urlPrefix, token_id],
    ([urlPrefix, token_id]) =>
      fetch(BASE_URL + urlPrefix + token_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取邀请信息"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      fallbackData: { invitor_id: "", project_name: "" },
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
