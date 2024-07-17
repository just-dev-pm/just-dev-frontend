"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRImmutable from "swr/immutable";

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
      })
        .then(handleResponse("获取用户关联的项目列表"))
        .then((res) => res.json()),
    { suspense: false },
  );

  return { data, mutateMyProjects, isLoading };
};
