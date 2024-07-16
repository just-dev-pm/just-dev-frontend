"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * @name 输入需求名称
 */
import { InlineEdit, InlineEditProps, Input } from "rsuite";

interface NameProps extends InlineEditProps {}
export const Name: React.FC<NameProps> = props => {
  const { form, onSubmit } = useChangeRequirementContext();
  return (
    <>
      <InlineEdit
        placeholder="输入需求名称"
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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SyntheticEvent, useState } from "react";
import { useChangeRequirementContext } from "./change-requirement-context";

const NameRender = ({ field }: { field: any }) => (
  <FormItem>
    <FormLabel htmlFor="text">需求名称</FormLabel>
    <FormControl>
      <Name {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
);

/**
 * @name 输入需求描述
 */
interface ContentProps extends InlineEditProps {}
export const Content: React.FC<ContentProps> = props => {
  const { form, onSubmit } = useChangeRequirementContext();
  return (
    <>
      <InlineEdit
        placeholder="输入需求描述"
        className="min-w-36 block"
        size="lg"
        onSave={() => {
          form.handleSubmit(onSubmit)();
        }}
        {...props}
      >
        <Input as="textarea" rows={5} />
      </InlineEdit>
      <FormDescription>用简洁的语言描述需求</FormDescription>
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

/**
 * @name 表单控制
 */
export function RequirementController() {
  const { form, onSubmit } = useChangeRequirementContext();

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
