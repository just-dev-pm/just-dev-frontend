import { BASE_URL } from "@/lib/global";
import useSWRMutation from "swr/mutation";

/** @key [/api/projects,{project_id},/drafts] */

export function useProjectDraftCreate({
  project_id,
}: {
  project_id: string;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/drafts`;
  const { data, error, trigger } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, draft_id, urlSuffix],arg:{arg:string}) =>
      fetch(BASE_URL + urlPrefix + draft_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
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
