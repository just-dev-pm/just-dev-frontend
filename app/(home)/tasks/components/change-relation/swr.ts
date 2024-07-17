"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";
import { ChangeRelationSchema } from "./request";

function Swr(linkId: string) {
  const { trigger } = useSWRMutation(
    ["/api/links/", linkId],
    ([url1, linkId], { arg }: { arg: ChangeRelationSchema }) =>
      fetch(BASE_URL + url1 + linkId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改用户任务关联类型"))
        .then((res) => res),
  );
  return { trigger };
}

export { Swr as useSWRChangeRelation };
