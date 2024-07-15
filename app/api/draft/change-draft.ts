import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key [/api/drafts,{draft_id}] */

export function useDraftChange({ draft_id }: { draft_id: string }) {
  const urlPrefix = `/api/drafts/`;
  const { data, error, trigger } = useSWRMutation(
    draft_id ? [urlPrefix, draft_id] : null,
    ([urlPrefix, draft_id], { arg }: { arg: { name: string } }) =>
      fetch(BASE_URL + urlPrefix + draft_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改草稿"))
        .then(res => res.json)
  );
  return {
    data,
    error,
    trigger,
  };
}
