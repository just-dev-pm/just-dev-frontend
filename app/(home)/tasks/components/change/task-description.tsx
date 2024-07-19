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

const TaskDescriptionFormField = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="description">任务描述</FormLabel>
          <FormControl>
            <InlineEdit
              placeholder="输入任务描述"
              className="min-w-36 block"
              size="lg"
              onSave={form.handleSubmit(onSubmit)}
              showControls={false}
              {...field}
            >
              <Input as="textarea" rows={5} id="description" />
            </InlineEdit>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { TaskDescriptionFormField };
