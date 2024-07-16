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
 * @description Arrange 选择结束时间
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

/**
 * FormField for 结束时间
 */
const EndTimeFormField = () => {
  const { form } = useAddEventContext();
  return (
    <FormField
      control={form.control}
      name="end_time"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="end_time">结束时间</FormLabel>
          <FormControl>
            <DatetimePicker {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { EndTimeFormField };
