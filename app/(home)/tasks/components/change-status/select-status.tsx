"use client";
/**
 * @description Arrange
 * 1. FormItem // deprecated
 * 2. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

import { StatusPool } from "@/app/(home)/components/status/response";
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
  statusPool: StatusPool;
}
const CustomFormField = ({
  defaultValue,
  statusPool,
}: CustomFormFieldProps) => {
  const { form, onSubmit } = useChangeStatusContext();

  useEffect(() => {
    form.setValue("status.id", defaultValue);
  }, []);

  if (!statusPool || !defaultValue)
    return <div>您的状态池为空, 请添加状态</div>;

  const { complete, incomplete } = statusPool;

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
              onChange={(v) => {
                form.setValue(
                  "status.category",
                  v === "complete" ? "complete" : "incomplete",
                );
                form.setValue("status.id", v);
              }}
            >
              <Radio value="complete" color="green">
                <Tag color="green">{complete.name}</Tag>
              </Radio>
              {incomplete.map((item) => (
                <Radio value={item.id} color="orange" key={item.id}>
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
