"use client";
import EditProfileForm, { UserData } from "./edit-profile-form";
import { ButtonProps } from "@/components/ui/button";

import Loading from "@/components/ui/loading";
import { useProfile } from "@/app/api/user/get-profile";
import { useProfileChange } from "@/app/api/user/change-profile";

const EditProfileController: React.FC<Omit<ButtonProps, "onSubmit">> = ({
  ...props
}) => {
  const { profile: oldData, mutate } = useProfile();

  const { trigger } = useProfileChange();

  const onSubmit = async (newData: UserData) => {
    // 处理表单提交逻辑，发送API请求
    await trigger(newData);
    mutate();
  };

  if (!oldData) return <Loading />;

  return <EditProfileForm oldData={oldData} onSubmit={onSubmit} {...props} />;
};

export default EditProfileController;
