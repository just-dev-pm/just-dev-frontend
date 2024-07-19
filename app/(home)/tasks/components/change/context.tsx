"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  ChangeTaskSchema as FormSchema,
  changeTaskSchema as formSchema,
} from "./zod";

/**
 * @description Arrange
 * 1. Schema
 * 2. Context
 * 3. useContext
 * 4. ContextProvider
 */

// 创建一个上下文对象
const Context = createContext<ContextReturn | null>(null);
interface ContextProps extends PropsWithChildren {
  initialData?: FormSchema;
  handleTaskChange: (res: any) => void;
}
interface ContextReturn {
  form: UseFormReturn<FormSchema>;
  onSubmit: (data: FormSchema) => void;
}
// 自定义钩子，用于快速访问上下文数据
const useCustomContext = () => useContext<ContextReturn | null>(Context);

/**
 * 上下文提供程序组件
 * @param children
 * @param initialData
 * @returns React.FC<>
 */
const ContextProvider: React.FC<ContextProps> = ({
  children,
  initialData,
  handleTaskChange,
}) => {
  const form: UseFormReturn<FormSchema> = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: "onSubmit",
  });

  function onSubmit(data: FormSchema) {
    handleTaskChange(data);
    /*

{"id":"12","name":"合你其规月","description":"张料于放出厂关便着务育与放对。此度低三油安将史并工产克很维看平方料。百被合往难根定段张们本济适日细理。会派备非没光近省品青本强于极。准观商件改主院极情难圆消是。","assignees":[{"id":"53"},{"id":"71"}],"status":{"category":"complete","id":""},"deadline":"nostrud eu dolore adipisicing","pr":{"owner":"dolor fugiat","repo":"ad","pull_number":98}}

		*/
  }

  return (
    <Context.Provider value={{ form, onSubmit }}>{children}</Context.Provider>
  );
};

export {
  ContextProvider as ChangeTaskContextProvider,
  useCustomContext as useChangeTaskContext,
};
