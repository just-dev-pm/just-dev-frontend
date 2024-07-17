"use client";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

function Swr() {
  const { toast } = useToast()
  const { trigger } = useSWRMutation(
    ["/api/links/"],
    ([url1], { arg }: { arg: string }) =>
      fetch(BASE_URL + url1 + arg, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除用户任务关联"))
        .then((res) => res), {
    onError() {
      toast({ description: "删除失败" })
    },
    onSuccess() {
      toast({ description: "删除成功" })
    }
  }
  );
  return { trigger };
}

export { Swr as useSWRDeleteRelation };
