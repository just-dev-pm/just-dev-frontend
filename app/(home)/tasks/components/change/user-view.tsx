"use client";
import { useStatusPool } from "@/app/(home)/components/status/context";
import { StatusControl } from "@/app/(home)/components/status/status-pool/status/control";
import { Form, FormLabel } from "@/components/ui/form";
import { ChangeStatusTrigger } from "../change-status/trigger";
import { useChangeTaskContext } from "./context";
import { DeadlineFormField } from "./deadline";
import { PrView } from "./pr";
import { TaskDescriptionFormField } from "./task-description";
import { TaskNameFormField } from "./task-name";

const View = () => {
  const context = useChangeTaskContext();

  const { statusPool } = useStatusPool();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form } = context;

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-8 grid-rows-[1/3] ">
        <TaskNameFormField />
        <TaskDescriptionFormField />
        <div className="flex flex-col gap-4">
          <FormLabel>任务状态</FormLabel>
          <ChangeStatusTrigger
            statusId={form.getValues("status.id")!}
            statusPool={statusPool!}
            Control={() => (
              <StatusControl statusId={form.getValues("status.id")!} />
            )}
          />
        </div>
        <DeadlineFormField />
        <PrView />
      </div>
    </Form>
  );
};

export { View as UserTaskView };
