"use client";
import { UserData } from "@/app/(home)/profile/components/edit-profile-form";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

export const useProfileChange = () => {
  const { toast } = useToast();
  const userId = useUserStore.getState().userId;
  const { trigger } = useSWRMutation(
    "/api/users",
    (url, { arg }: { arg: UserData }) =>
      fetch(`${BASE_URL}${url}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(res => res),
    {
      onSuccess: (data, key, config) => {
        toast({
          title: "更新用户信息成功",
        });
      },
    }
  );
  return { trigger };
};
