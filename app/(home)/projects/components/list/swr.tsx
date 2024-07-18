import { BASE_URL } from "@/lib/global";
import useSWR from "swr";

function Swr(projectId: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/task_lists`;
  const { data, isLoading, mutate } = useSWR(
    projectId ? [urlPrefix, projectId, urlSuffix] : null,
    ([urlPrefix, projectId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + projectId + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: false, refreshInterval: 5000 },
  );

  return { data, isLoading, mutate };
}

export { Swr as useSWRTaskLists };
