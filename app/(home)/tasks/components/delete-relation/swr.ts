"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

function Swr(linkId: string) {
  const { trigger } = useSWRMutation(
    ["/api/links/", linkId],
    ([url1, linkId]) =>
      fetch(BASE_URL + url1 + linkId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除用户任务关联"))
        .then((res) => res),
  );
  return { trigger };
}

export { Swr as useSWRDeleteRelation };
