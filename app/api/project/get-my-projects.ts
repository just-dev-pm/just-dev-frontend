"use client";
import { BASE_URL } from "@/lib/global";
import useProjectStore from "@/store/projectStore";
import { useUserStore } from "@/store/userStore";
import { Project, Projects } from "@/types/projects";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { mutate } from "swr";

export const useMyProjects = () => {
  const userId = useUserStore.getState().userId;
  const setRawProjects = useProjectStore(state => state.setRawProjects);
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

  // 更新 store 中的数据
  useEffect(() => {
    if (data?.projects) {
      setRawProjects(data.projects as Project[]);
    }
  }, [data]);
  return { data, mutateMyProjects, isLoading };
};
