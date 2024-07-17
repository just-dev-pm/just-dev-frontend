"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { SelectStatus } from "../change-status/select-status";
import { useChangeTaskContext } from "./context";
import { useGetUserStatusPool } from "./get-status-pool";

/**
 * @description Arrange
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

/**
 * FormField
 */
const StatusFormField = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;
  const { options } = useGetUserStatusPool();
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-4 justify-center">
          <FormLabel>任务状态</FormLabel>
          <FormControl>
            <SelectStatus
              onSelect={v => {
                if (v === "complete") {
                  form.setValue("status.category", "complete");
                  form.setValue("status.id", "");
                } else {
                  form.setValue("status.category", "incomplete");
                  form.setValue("status.id", v);
                }
                form.trigger();
                if (v) {
                  onSubmit(form.getValues());
                }
              }}
              data={options}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { StatusFormField };
