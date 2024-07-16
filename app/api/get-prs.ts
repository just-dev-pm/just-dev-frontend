/** @key [/api/projects/,{project_id},/prs] */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export default function usePrs({ project_id }: { project_id: string }) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/prs`;
  const { data, error, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取prs"))
        .then((res) => res.json()),
    { fallbackData: { prs: [] } }
  );
  return {
    data,
    error,
    isLoading,
  };
}
