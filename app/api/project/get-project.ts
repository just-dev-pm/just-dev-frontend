"use client";
import { BASE_URL } from "@/lib/global";
import useProjectStore from "@/store/projectStore";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export const useProject = (projectId: string) => {
  const setRipeProject = useProjectStore(state => state.setRipeProject);
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
  useEffect(() => {
    if (data) {
      setRipeProject(data);
    }
  }, [data]);
  return { data, mutate, error };
};
