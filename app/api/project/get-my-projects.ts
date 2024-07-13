"use client";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { Project, Projects } from "@/types/projects";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { mutate } from "swr";

export const useMyProjects = () => {
  const userId = useUserStore.getState().userId;
  const {
    data,
    mutate: mutateMyProjects,
    isLoading,
  } = useSWRImmutable(
    ["/api/users/", "/projects"],
    ([preUrl, sufUrl]) =>
      fetch(`${BASE_URL}${preUrl + userId + sufUrl}`, {
        credentials: "include",
      }).then(res => res.json()),
    { fallbackData: { projects: [] } }
  );

  return { data, mutateMyProjects, isLoading };
};
