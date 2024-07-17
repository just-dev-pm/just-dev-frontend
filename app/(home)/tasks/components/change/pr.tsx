"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InlineEdit } from "rsuite";
import { useChangeTaskContext } from "./context";

/**
 * @description Arrange
 * 1. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

const PrFormField = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;
  return (
    <FormField
      control={form.control}
      name="pr"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="pr">Github PR</FormLabel>
          <InlineEdit
            placeholder="选择委派人"
            onSave={form.handleSubmit(onSubmit)}
            {...field}
          >
            {(props, ref) => {
              const { value, onChange, plaintext, ...rest } = props;

              if (plaintext) {
                return (
                  <span className="mx-4">
                    {JSON.stringify(value) || "选择PR"}
                  </span>
                );
              }

              return (
                <Select onValueChange={onChange} defaultValue={value} {...rest}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          </InlineEdit>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PrView = () => {
  const context = useChangeTaskContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;
  const pr = form.getValues().pr;
  return (
    <div>
      <FormLabel>Github PR</FormLabel>
      <Card className="max-w-[30vw]">
        <CardHeader>
          <CardTitle>{pr.repo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <span>拥有者</span>
              <span>{pr.owner}</span>
            </div>
            <div className="flex gap-4">
              <span>拉取编号</span>
              <span>{pr.pull_number}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export { PrFormField, PrView };
