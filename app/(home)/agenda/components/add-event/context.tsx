"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { AddEventFormSchema, addEventFormSchema } from "./zod";

/**
 * @description Arrange
 * 1. Schema
 * 2. Context
 * 3. useContext
 * 4. ContextProvider
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

  function onSubmit(data: FormSchema) {
    console.log(JSON.stringify(data));
    /*
	{"name":"sfsf","description":"sdfsdf","start_time":"2024-07-16T10:27:57.856Z","end_time":"2024-07-16T10:27:39.795Z"}
		*/
  }

  return (
    <Context.Provider value={{ form, onSubmit }}>{children}</Context.Provider>
  );
};

export const useAddEventContext = useCustomContext;
export const AddEventContextProvider = ContextProvider;
