"use client";
import { DatetimePicker } from "@/app/(home)/agenda/components/add-event/datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { useChangeTaskContext } from "./context";
import { dateSchema } from "./zod";

/**
 * @description Arrange
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

const DeadlineFormField = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;
  console.log("任务截止时间", dateSchema.safeParse(form.getValues("deadline")));
  const check = dateSchema.safeParse(form.getValues("deadline"));

  useEffect(() => {
    if (check.success) {
      form.setValue("deadline", check.data);
    }
  }, [check]);
  return (
    <FormField
      control={form.control}
      name="deadline"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="deadline">截止时间</FormLabel>
          <FormControl>
            <DatetimePicker
              defaultValue={check.data}
              {...field}
              onSelect={() => form.handleSubmit(onSubmit)()}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { DeadlineFormField };
