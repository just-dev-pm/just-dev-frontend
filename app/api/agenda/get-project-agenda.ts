import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/agendas] */
export default function useProjectAgenda({
  project_id,
}: {
  project_id: string;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/agendas`;
  const { data, error, mutate, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目日程"))
        .then((res) => res.json()),
    { fallbackData: { agendas: [] } }
  );
  return { data, error, mutate, isLoading };
}
