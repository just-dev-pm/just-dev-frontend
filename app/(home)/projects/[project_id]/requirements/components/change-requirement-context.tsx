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
 * @name 普通输入
 * @content TextArea
 */
const formSchema = z.object({
  name: z.string().min(1, "需求名称不能为空").max(50, "名称不能超过50字"),
  content: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

// 上下文提供程序组件
export const ChangeRequirementContextProvider: React.FC<
  PropsWithChildren & { initialRequirment: FormSchema }
> = ({ children, initialRequirment }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialRequirment,
  });

  /*
  { name: "更土己集提sdfsdf", content: "sed aute incididunt quis commododsfds" }
  */

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <Context.Provider value={{ form, onSubmit }}>{children}</Context.Provider>
  );
};

// 自定义钩子，用于快速访问上下文数据
export const useChangeRequirementContext = () => useContext(Context);
