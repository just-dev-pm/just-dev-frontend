import { z } from "zod";

export const addEventFormSchema = z.object({
  name: z.string().min(1, "名称不能为空").default(""),
  description: z.string().min(1, "描述不能为空").default(""),
  start_time: z.date({ required_error: "请选择开始时间" }).default(new Date()),
  end_time: z.date({ required_error: "请选择结束时间" }).default(new Date()),
  participants: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .default([]),
});

export type AddEventFormSchema = z.infer<typeof addEventFormSchema>;
