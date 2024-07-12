import { BASE_URL } from "@/lib/global";
import useSWRMutation from "swr/mutation";

/** @key [/api/drafts,{draft_id}] */

export function useDraftChange({
  draft_id,
  name = undefined,
}: {
  draft_id: string;
  name?: string;
}) {
  const urlPrefix = `/api/drafts/`;
  const { data, error, trigger } = useSWRMutation(
    draft_id ? [urlPrefix, draft_id] : null,
    ([urlPrefix, draft_id]) =>
      fetch(BASE_URL + urlPrefix + draft_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      })
  );
  return {
    data,
    error,
    trigger,
  };
}
