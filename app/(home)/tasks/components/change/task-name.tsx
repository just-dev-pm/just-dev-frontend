"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InlineEdit, Input } from "rsuite";
import { useChangeTaskContext } from "./context";

/**
 * @description Arrange
 * 1. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

const TaskNameFormField = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="name">任务名</FormLabel>
          <FormControl>
            <InlineEdit
              placeholder="输入任务名称"
              className="min-w-36 block"
              size="lg"
              onSave={form.handleSubmit(onSubmit)}
              {...field}
            >
              <Input id="name" {...field} />
            </InlineEdit>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { TaskNameFormField };
