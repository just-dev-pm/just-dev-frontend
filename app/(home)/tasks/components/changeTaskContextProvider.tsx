"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Context = createContext<any>(null);

const formSchema = z.object({
  name: z.string().min(1, "任务名不能为空"),
  description: z.string().min(1, "任务描述不能为空"),
  member: z.array(z.string()),
  pr: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export const ChangeTaskContextProvider: React.FC<
  PropsWithChildren & { initialTask: FormSchema }
> = ({ children, initialTask }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialTask,
  });

  //

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return <Context.Provider value={{ form,onSubmit }}>{children}</Context.Provider>;
};

export const useChangeTaskContext = () => useContext(Context);
