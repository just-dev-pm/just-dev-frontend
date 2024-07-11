"use client";
import useSWR, { mutate } from "swr";
import { useUserStore } from "@/store/userStore";
import EditProfileForm, { UserData } from "./edit-profile-form";
import { ButtonProps } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "@/lib/global";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/ui/loading";

const EditProfileController: React.FC<Omit<ButtonProps, "onSubmit">> = ({
  ...props
}) => {
  const userId = useUserStore.getState().userId;
  const { toast } = useToast();

  const { data: oldData, isLoading } = useSWR<UserData>(
    "/api/users",
    url =>
      fetch(`${BASE_URL}${url}/${userId}`, {
        credentials: "include",
      }).then(res => res.json()),
    { fallbackData: { username: "", avatar: "", email: "" } }
  );

  const { error, trigger } = useSWRMutation(
    "/api/users",
    (url, { arg }: { arg: UserData }) =>
      fetch(`${BASE_URL}${url}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(res => res.json()),
    {
      onSuccess: (data, key, config) => {
        toast({
          title: "更新用户信息成功",
        });
      },
    }
  );

  const onSubmit = async (newData: UserData) => {
    // 处理表单提交逻辑，发送API请求
    await trigger(newData);
    mutate("/api/users");
  };

  if (!oldData || isLoading) return <Loading />;

  return <EditProfileForm oldData={oldData} onSubmit={onSubmit} {...props} />;
};

export default EditProfileController;
