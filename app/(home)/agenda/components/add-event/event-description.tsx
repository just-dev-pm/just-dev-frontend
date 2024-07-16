"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddEventContext } from "./context";

/**
 * @description Arrange 写入事件描述
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

/**
 * FormField for 事件描述
 */
const EventDescriptionFormField = () => {
  const { form } = useAddEventContext();
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="description">事件描述</FormLabel>
          <FormControl>
            <Textarea
              rows={5}
              id="description"
              placeholder="请输入事件描述"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { EventDescriptionFormField };
