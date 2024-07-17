"use client";
import { Form } from "@/components/ui/form";
import { useChangeTaskContext } from "./context";
import { DeadlineFormField } from "./deadline";
import { PrView } from "./pr";
import { StatusFormField } from "./status";
import { TaskDescriptionFormField } from "./task-description";
import { TaskNameFormField } from "./task-name";

const View = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form } = context;

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-8 grid-rows-[1/3] ">
        <TaskNameFormField />
        <TaskDescriptionFormField />
        <StatusFormField />
        <DeadlineFormField />
        <PrView />
      </div>
    </Form>
  );
};

export { View as UserTaskView };
