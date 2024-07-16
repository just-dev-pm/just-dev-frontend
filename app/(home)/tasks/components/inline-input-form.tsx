"use client";

import { InlineEdit, InlineEditProps, Input } from "rsuite";
import { useChangeTaskContext } from "./changeTaskContextProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import { ControllerRenderProps } from "react-hook-form";

interface NameProps extends InlineEditProps {}
export const Name: React.FC<NameProps> = (props) => {
  const { form, onSubmit } = useChangeTaskContext();
  return (
    <>
      <InlineEdit
        placeholder="输入任务名称"
        className="min-w-36 block"
        size="lg"
        onSave={() => {
          form.handleSubmit(onSubmit)();
        }}
        {...props}
      >
        <Input />
      </InlineEdit>
    </>
  );
};

const NameRender = ({ field }: { field: any }) => (
  <FormItem>
    <FormLabel htmlFor="text">任务名称</FormLabel>
    <FormControl>
      <Name {...field} />
    </FormControl>
    <FormMessage></FormMessage>
  </FormItem>
);

interface ContentProps extends InlineEditProps {}
export const Content: React.FC<ContentProps> = (props) => {
  const { form, onSubmit } = useChangeTaskContext();
  return (
    <>
      <InlineEdit
        placeholder="输入任务描述"
        className="min-w-36 block"
        size="lg"
        onSave={() => {
          form.handleSubmit(onSubmit)();
        }}
        {...props}
      >
        <Input as="textarea" rows={5} />
      </InlineEdit>
    </>
  );
};

const ContentRender = ({ field }: { field: any }) => (
  <FormItem>
    <FormLabel htmlFor="text">需求描述</FormLabel>
    <FormControl className="w-full">
      <Content {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
);








export function RequirementController() {
  const { form, onSubmit } = useChangeTaskContext();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField control={form.control} name="name" render={NameRender} />
        <FormField
          control={form.control}
          name="content"
          render={ContentRender}
        />
      </form>
    </Form>
  );
}
