"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export const useProject = (projectId: string) => {
  const { data, mutate, error } = useSWRImmutable(
    ["/api/projects/", projectId],
    ([url, projectId]) =>
      fetch(`${BASE_URL}${url}${projectId}`, {
        headers:{
          "Content-Type":"application/json; charset=UTF-8"
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目信息"))
        .then(res => res.json()),
    { fallbackData: { id: "", description: "", name: "" } }
  );

  return { data, mutate, error };
};
