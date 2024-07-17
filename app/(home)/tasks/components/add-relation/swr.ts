"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";
import { NewRelationSchema } from "./request";
import { useToast } from "@/components/ui/use-toast";

function Swr() {
  const userId = useUserStore.getState().userId;
  const {toast} = useToast();
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
        .then((res) => res.json()),{
          onError(){
            toast({description:"创建失败"})
          },
          onSuccess(){
            toast({description:"创建成功"})
          }
        }
  );
  return { trigger };
}

export { Swr as useSWRNewRelation };
