"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Radio, RadioGroup } from "rsuite";
import { useChangeRelationContext } from "./context";

/**
 * @description Arrange
 * 1. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

const CustomFormField = () => {
  const context = useChangeRelationContext();

  if (!context) {
    throw new Error("未包裹 ContextProvider");
  }

  const { form, onSubmit } = context;
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="category">类型</FormLabel>
          <FormControl>
            <RadioGroup inline defaultValue="auto" {...field}>
              <Radio value="auto">自动</Radio>
              <Radio value="dep">依赖</Radio>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CustomFormField as CategoryFormField };
