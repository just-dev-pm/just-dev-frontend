"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddEventContext } from "./context";

/**
 * @description Arrange 写入事件名
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

/**
 * FormField for 开始时间
 */
const EventNameFormField = () => {
  const { form } = useAddEventContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="name">事件名</FormLabel>
          <FormControl>
            <Input id="name" placeholder="请输入事件名" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { EventNameFormField };
