"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

export const useMarkNotifications = () => {
  const userId = useUserStore.getState().userId;
  const { trigger } = useSWRMutation(
    ["/api/users", "/notifications"],
    ([url1, url2], { arg }: { arg: string }) =>
      fetch(`${BASE_URL}${url1}/${userId}${url2}/${arg}`, {
        method: "PATCH",

        credentials: "include",
      }).then(handleResponse("标记通知"))
  );
  return {
    trigger,
  };
};
