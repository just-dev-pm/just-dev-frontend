"use client";
import { BASE_URL } from "@/lib/global";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export const useProject = (projectId: string) => {
  const { data, mutate, error } = useSWRImmutable(
    ["/api/projects/", projectId],
    ([url, projectId]) =>
      fetch(`${BASE_URL}${url}${projectId}`, {
        credentials: "include",
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res;
        })
        .then(res => res.json()),
    { fallbackData: { id: "", description: "", name: "" } }
  );

  return { data, mutate, error };
};
