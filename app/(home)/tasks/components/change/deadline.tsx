"use client";
import { DatetimePicker } from "@/app/(home)/agenda/components/add-event/datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangeTaskContext } from "./context";

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
  return (
    <FormField
      control={form.control}
      name="deadline"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="deadline">截止时间</FormLabel>
          <FormControl>
            <DatetimePicker
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
