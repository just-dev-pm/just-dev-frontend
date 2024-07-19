"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

export const useProject = (projectId: string) => {
  const { data, mutate, error, isLoading } = useSWR(
    projectId ? ["/api/projects/", projectId] : null,
    ([url, projectId]) =>
      fetch(`${BASE_URL}${url}${projectId}`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目信息"))
        .then((res) => res.json()),
    {
      fallbackData: {
        id: "",
        description: "",
        name: "",
        github: 0,
        status_pool: {
          complete: {},
          incomplete: [],
        },
      },
    },
  );

  return { data, mutate, error, isLoading };
};
