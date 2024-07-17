"use client";

/** @key /api/projects/{project_id} */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export default function useProjectInfo(projectId: string){
  const urlPrefix = `/api/projects/`;
  const { data, mutate, error, isLoading } = useSWR(
    projectId ? [urlPrefix, projectId] : null,
    ([url, projectId]) =>
      fetch(BASE_URL + urlPrefix + projectId, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目信息"))
        .then(res => res.json()),
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
    }
  );

  return { data, mutate, error, isLoading };
};
