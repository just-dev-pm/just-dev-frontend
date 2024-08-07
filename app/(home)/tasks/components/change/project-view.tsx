"use client";
import { useProjectStatusPool } from "@/app/(home)/components/status/status-pool/project/context";
import { ProjectStatusControl } from "@/app/(home)/components/status/status-pool/project/projectStatusControl";
import useUsersInProject from "@/app/api/project/get-users-in-project";
import { Form, FormLabel } from "@/components/ui/form";
import { User } from "@/types/user";
import React from "react";
import { Loader } from "rsuite";
import { useChangeStatusContext } from "../change-status/context";
import { ChangeStatusTrigger } from "../change-status/trigger";
import { AssigneesFormField } from "./asignees";
import { useChangeTaskContext } from "./context";
import { DeadlineFormField } from "./deadline";
import { PrView } from "./pr";
import { TaskDescriptionFormField } from "./task-description";
import { TaskNameFormField } from "./task-name";

interface ViewProps {
  projectId: string;
}
const View: React.FC<ViewProps> = ({ projectId }) => {
  const context = useChangeTaskContext();
  const statusContext = useChangeStatusContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form } = context;

  const { form: statusForm } = statusContext;
  const { data, isLoading } = useUsersInProject({ project_id: projectId });

  const { statusPool } = useProjectStatusPool();

  if (isLoading) return <Loader />;

  /**
   * 将 User[] 转换为 { label: string, value: string }[]
   * @param users User[] 用户数组
   * @returns { label: string, value: string }[] 转换后的数组
   */
  const convertUsersToOptions = (
    users: User[],
  ): { label: string; value: string }[] => {
    if (!users || users.length === 0) return [];
    return users.map((user) => ({
      label: user.username,
      value: user.id,
    }));
  };

  console.log(form.getValues())

  return (
    <Form {...form}>
        <div className="grid grid-cols-2 gap-8 grid-rows-[1/3] ">
          <TaskNameFormField />
          <TaskDescriptionFormField />
      <Form {...statusForm}>
          {statusForm.getValues("status.id") && <div className="flex flex-col gap-4">
            <FormLabel>任务状态</FormLabel>
            <ChangeStatusTrigger
              statusId={statusForm.getValues("status.id")!}
              statusPool={statusPool!}
              Control={() => (
                <ProjectStatusControl
                  statusId={statusForm.getValues("status.id")!}
                />
              )}
              />
          </div>}
              </Form>
          <AssigneesFormField data={convertUsersToOptions(data.users)} />
          <DeadlineFormField />
          <PrView />
        </div>
    </Form>
  );
};

export { View as ProjectTaskView };
