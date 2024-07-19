"use client";
import { useStatusPool } from "@/app/(home)/components/status/context";
import { StatusControl } from "@/app/(home)/components/status/status-pool/status/control";
import { Form, FormLabel } from "@/components/ui/form";
import { useChangeStatusContext } from "../change-status/context";
import { ChangeStatusTrigger } from "../change-status/trigger";
import { useChangeTaskContext } from "./context";
import { DeadlineFormField } from "./deadline";
import { PrView } from "./pr";
import { TaskDescriptionFormField } from "./task-description";
import { TaskNameFormField } from "./task-name";

const View = () => {
  const context = useChangeTaskContext();
  const statusContext = useChangeStatusContext();

  const { statusPool } = useStatusPool();

  if (!context || !statusContext) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form } = context;
  const { form: statusForm } = statusContext;

  return (
    <Form {...form}>
      <Form {...statusForm}>
        <div className="grid grid-cols-2 gap-8 grid-rows-[1/3] ">
          <TaskNameFormField />
          <TaskDescriptionFormField />
          <div className="flex flex-col gap-4">
            <FormLabel>任务状态</FormLabel>
            <ChangeStatusTrigger
              statusId={statusForm.getValues("status.id")!}
              statusPool={statusPool!}
              Control={() => (
                <StatusControl statusId={statusForm.getValues("status.id")!} />
              )}
            />
          </div>
          <DeadlineFormField />
          <PrView />
        </div>
      </Form>
    </Form>
  );
};

export { View as UserTaskView };
