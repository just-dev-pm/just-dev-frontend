import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/requirements] */

export default function useProjectRequirements({
  project_id,
}: {
  project_id: string;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/requirements`;
  const { data, error,mutate } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { requirements: [] } }
  );
  return {
    data,
    error,
    mutate
  };
}
