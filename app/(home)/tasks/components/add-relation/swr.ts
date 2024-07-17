"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";
import { NewRelationSchema } from "./request";

function Swr() {
  const userId = useUserStore.getState().userId;
  const { trigger } = useSWRMutation(
    ["/api/users/", userId, "/links"],
    ([url1, userId, url2], { arg }: { arg: NewRelationSchema }) =>
      fetch(BASE_URL + url1 + userId + url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建用户任务关联"))
        .then((res) => res),
  );
  return { trigger };
}

export { Swr as useSWRNewRelation };
