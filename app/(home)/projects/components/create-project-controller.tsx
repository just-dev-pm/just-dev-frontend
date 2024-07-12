"use client";
import useSWR, { mutate } from "swr";
import { ButtonProps } from "@/components/ui/button";
import { useProjectCreate } from "@/app/api/project/create-project";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
import CreateProjectForm from "./create-project-form";

const CreateProjectController: React.FC<Omit<ButtonProps, "onSubmit">> = ({
  ...props
}) => {
  const { trigger } = useProjectCreate();

  const onSubmit = async (newData: CreateProjectFormSchema) => {
    // 处理表单提交逻辑，发送API请求
    await trigger(newData);
  };

  return <CreateProjectForm onSubmit={onSubmit} {...props} />;
};

export default CreateProjectController;
