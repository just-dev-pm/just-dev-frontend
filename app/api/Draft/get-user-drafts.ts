import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

/** @key [/api/users/,{user_id},/drafts] */

export default function useUserDrafts({ user_id }: { user_id: string }) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method:"GET",
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { drafts: [] } }
  );
  return {
    data,
    error
  };
}
