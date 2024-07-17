"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "rsuite";
import { useNewRelationContext } from "./context";

/**
 * @description Arrange
 * 1. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

const FromFormField = () => {
  const context = useNewRelationContext();

  if (!context) {
    throw new Error("未包裹 ContextProvider");
  }

  const { form, onSubmit } = context;
  return (
    <FormField
      control={form.control}
      name="from.id"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="from">前置任务id</FormLabel>
          <FormControl>
            <Input id="from" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FromFormField };
