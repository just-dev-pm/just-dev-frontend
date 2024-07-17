import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/users] */

export default function useUsersInProject({
  project_id,
}: {
  project_id: string;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/users`;
  const { data, error, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        credentials: "include",
      }).then(res => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: false }
  );
  return {
    data,
    error,
    isLoading,
  };
}
