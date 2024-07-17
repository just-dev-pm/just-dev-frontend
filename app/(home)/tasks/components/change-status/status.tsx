"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useChangeStatusContext } from "./context";
import { useStatusContext } from "./get-status";
import { SelectStatus } from "./select-status";

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
  const { form, onSubmit } = useChangeStatusContext();
  const { options } = useStatusContext();
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <SelectStatus
              defaultValue={
                form.getValues().status.category === "complete"
                  ? "complete"
                  : form.getValues().status.id
              }
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
