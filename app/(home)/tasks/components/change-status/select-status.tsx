"use client";
/**
 * @description Arrange
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

import { useStatusPool } from "@/app/(home)/components/status/context";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { PropsWithChildren, useEffect } from "react";
import { Radio, RadioGroup, Tag } from "rsuite";
import { useChangeStatusContext } from "./context";

const RadioLabel = ({ children }: PropsWithChildren) => (
  <label style={{ padding: 7 }}>{children}</label>
);

/**
 * FormField
 */
interface CustomFormFieldProps {
  defaultValue: string;
}
const CustomFormField = ({ defaultValue }: CustomFormFieldProps) => {
  const { form, onSubmit } = useChangeStatusContext();
  const { getStatusById, statusPool } = useStatusPool();

  if (!statusPool || !defaultValue)
    return <div>您的状态池为空, 请添加状态</div>;

  const { complete, incomplete } = statusPool;

  useEffect(() => {
    form.setValue("status.id", defaultValue);
  }, []);

  return (
    <FormField
      control={form.control}
      name="status.id"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              className="border-none"
              defaultValue={defaultValue}
              value={form.value}
              onChange={() => {
                form.onChange();
                form.setValue(
                  "status.category",
                  form.value === "complete" ? "complete" : "incomplete",
                );
              }}
            >
              <Radio value="complete" color="green">
                <Tag color="green">{complete.name}</Tag>
              </Radio>
              {incomplete.map((item) => (
                <Radio value={item.id} color="orange">
                  <Tag color="orange">{item.status.name}</Tag>
                </Radio>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { CustomFormField as ChangeStatusFormField };
