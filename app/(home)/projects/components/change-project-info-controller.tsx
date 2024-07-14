"use client";
import useSWR, { mutate } from "swr";
import { ButtonProps } from "@/components/ui/button";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
import { useMyProjects } from "@/app/api/project/get-my-projects";
import { toast } from "@/components/ui/use-toast";
import { useChangeProject } from "@/app/api/project/change-project-info";
import ChangeProjectInfoForm from "./change-project-info-form";
import { useProject } from "@/app/api/project/get-project";
import { LucideProps } from "lucide-react";

const ChangeProjectInfoController: React.FC<
  Omit<LucideProps, "onSubmit"> & { project_id: string }
> = ({ project_id, ...props }) => {
  const { trigger } = useChangeProject(project_id);
  const { mutateMyProjects } = useMyProjects();
  const { data, mutate } = useProject(project_id);

  const onSubmit = async (newData: CreateProjectFormSchema) => {
    // 处理表单提交逻辑，发送API请求
    await trigger(newData);
    await mutate();
    toast({
      title: "修改项目信息成功",
      description: `你已成功修改项目 ${newData.name}`,
    });
  };

  return (
    <ChangeProjectInfoForm
      oldData={{
        avatar: "",
        name: "",
        description: "",
        ...data,
      }}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

export default ChangeProjectInfoController;
