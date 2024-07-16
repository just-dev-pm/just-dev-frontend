"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 创建一个上下文对象
const Context = createContext<any>(null);

/**
 * @name 选择状态: OK或者不OK
 * @abstract status: { category: 'incomplte' | 'complete' }, 在 incomplete 的时候还需要 id
 */
const formSchema = z
  .object({
    category: z.enum(["incomplete", "complete"]),
    id: z.string().optional(),
  })
  .refine(
    data => (data.category === "incomplete" ? data.id !== undefined : true),
    { message: "必须输入id" }
  );

export const statusSchema = formSchema;

type FormSchema = z.infer<typeof formSchema>;

// 上下文提供程序组件
export const CreateTaskContextProvider: React.FC<
  PropsWithChildren & { initialRequirment: FormSchema }
> = ({ children, initialRequirment }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialRequirment,
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <Context.Provider value={{ form, onSubmit }}>{children}</Context.Provider>
  );
};

// 自定义钩子，用于快速访问上下文数据
export const useCreateTaskContext = () => useContext(Context);
