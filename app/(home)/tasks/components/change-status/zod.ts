import { z } from "zod";
import { statusSchema } from "../form/create-task-context";

export const changeStatusSchema = z.object({
  name: z.string().min(1, "任务名不能为空").default(""),
  description: z.string().min(1, "任务描述不能为空").default(""),
  asignees: z.array(z.string()).default([]),
  deadline: z.date({ required_error: "截止时间不能为空" }).default(new Date()),
  pr: z.string().default(""),
  status: statusSchema.default({ category: "complete" }),
});

export type ChangeStatusSchema = z.infer<typeof changeStatusSchema>;
