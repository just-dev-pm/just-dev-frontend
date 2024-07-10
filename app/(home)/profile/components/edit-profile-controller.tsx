"use client";
import { mutate } from "swr";
import { useUserStore } from "@/store/userStore";
import EditProfileForm, { UserData } from "./edit-profile-form";
import { ButtonProps } from "@/components/ui/button";

const EditProfileController: React.FC<Omit<ButtonProps, "onSubmit">> = ({
  ...props
}) => {
  const userId = useUserStore(state => state.userId);
  const url = `/api/users/`;

  const oldData: UserData = {
    avatar: "",
    username: "",
    email: "",
    status_pool: {
      complete: {
        name: "c1",
        description: "1",
      },
      incomplete: [
        {
          id: "2",
          status: {
            name: "i1",
            description: "3",
          },
        },
      ],
    },
  };

  const onSubmit = (newData: UserData) => {
    // mutate(userId ? [url, userId] : null);
    // 处理表单提交逻辑，例如发送API请求等
    console.log(newData);
  };

  return <EditProfileForm oldData={oldData} onSubmit={onSubmit} {...props} />;
};

export default EditProfileController;
