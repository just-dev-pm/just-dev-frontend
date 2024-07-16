import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

/** @key [/api/drafts/,{draft_id}] */

export default function useDraft({ draft_id }: { draft_id: string }) {
  const urlPrefix = `/api/drafts/`;
  const { data, error, isLoading, mutate } = useSWR(
    draft_id ? [urlPrefix, draft_id] : null,
    ([urlPrefix, project_id]) =>
      fetch(BASE_URL + urlPrefix + project_id, {
        credentials: "include",
      }).then(res => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { drafts: [] } }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
