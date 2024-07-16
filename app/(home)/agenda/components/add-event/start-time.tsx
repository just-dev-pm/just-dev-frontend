"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddEventContext } from "./context";
import { DatetimePicker } from "./datetime-picker";

/**
 * @description Arrange 选择开始事件
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

/**
 * FormField for 开始时间
 */
const StartTimeFormField = () => {
  const { form } = useAddEventContext();
  return (
    <FormField
      control={form.control}
      name="start_time"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="start_time">开始时间</FormLabel>
          <FormControl>
            <DatetimePicker {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { StartTimeFormField };
