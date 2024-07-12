import { BASE_URL } from "@/lib/global";
import useSWRMutation from "swr/mutation";

/** @key [/api/users,{user_id},/drafts] */

export function useUserDraftCreate({
  user_id,
  name,
}: {
  user_id: string;
  name: string;
}) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error, trigger } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, draft_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + draft_id + urlSuffix, {
        method: "POST",
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
