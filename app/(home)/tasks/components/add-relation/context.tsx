"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  NewRelationSchema as FormSchema,
  newRelationSchema as formSchema,
} from "./request";

/**
 * @description Arrange
 * 1. Schema
 * 2. Context
 * 3. useContext
 * 4. ContextProvider
 */

// 创建一个上下文对象
const Context = createContext<any | null>(null);
interface ContextProps extends PropsWithChildren {
  initialData?: FormSchema;
  onSubmit: (data: FormSchema) => void;
  taskId: string;
}
// 自定义钩子，用于快速访问上下文数据
const useCustomContext = () => useContext(Context);

/**
 * 上下文提供程序组件
 * @param children
 * @param initialData
 * @returns React.FC<>
 */
const ContextProvider: React.FC<ContextProps> = ({
  children,
  initialData,
  onSubmit,
  taskId,
}) => {
  const form: UseFormReturn<FormSchema> = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      from: {
        id: taskId,
      },
    },
    mode: "onSubmit",
  });

  return (
    <Context.Provider value={{ form, onSubmit, taskId }}>
      {children}
    </Context.Provider>
  );
};

export {
  ContextProvider as NewRelationContextProvider,
  useCustomContext as useNewRelationContext,
};
