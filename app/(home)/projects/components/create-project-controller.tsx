"use client";
import useSWR, { mutate } from "swr";
import { ButtonProps } from "@/components/ui/button";
import { useProjectCreate } from "@/app/api/project/create-project";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
import CreateProjectForm from "./create-project-form";
import { useMyProjects } from "@/app/api/project/get-my-projects";
import { toast } from "@/components/ui/use-toast";

const CreateProjectController: React.FC<Omit<ButtonProps, "onSubmit">> = ({
  ...props
}) => {
  const { trigger } = useProjectCreate();
  const { mutateMyProjects } = useMyProjects();

  const onSubmit = async (newData: CreateProjectFormSchema) => {
    // 处理表单提交逻辑，发送API请求
    await trigger(newData);
    await mutateMyProjects();
    toast({
      title: "创建项目成功",
      description: `你已成功创建项目 ${newData.name}`,
    });
  };

  return <CreateProjectForm onSubmit={onSubmit} {...props} />;
};

export default CreateProjectController;
