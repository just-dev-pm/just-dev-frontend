"use client";
import {
  AddEventFormSchema,
  addEventFormSchema,
} from "@/app/(home)/agenda/components/add-event/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { useForm } from "react-hook-form";

/**
 * @description Arrange
 * 1. Schema
 * 2. Context
 * 3. useContext
 */

const formSchema = addEventFormSchema;
type FormSchema = AddEventFormSchema;

// 创建一个上下文对象
const Context = createContext<any>(null);
interface ContextProps extends PropsWithChildren {
  initialData?: FormSchema;
}
// 自定义钩子，用于快速访问上下文数据
const useCustomContext = () => useContext(Context);

/**
 * 上下文提供程序组件
 * @param children
 * @param initialData
 * @returns React.FC<>
 */
const ContextProvider: React.FC<ContextProps> = ({ children, initialData }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  function onSubmit(data: FormSchema) {}

  return (
    <Context.Provider value={{ form, onSubmit }}>{children}</Context.Provider>
  );
};
