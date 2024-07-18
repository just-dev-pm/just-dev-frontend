import { z } from "zod";
import { statusSchema } from "../form/create-task-context";

export const changeTaskSchema = z.object({
  name: z.string().min(1, "任务名不能为空").default(""),
  description: z.string().min(1, "任务描述不能为空").default(""),
  asignees: z.array(z.string()).default([]),
  deadline: z.coerce.date(),
  pr: z.object({
    owner: z.string(),
    repo: z.string(),
    pull_number: z.coerce.number(),
  }),
  status: statusSchema.default({ category: "complete" }),
});

export type ChangeTaskSchema = z.infer<typeof changeTaskSchema>;
export const dateSchema = z.coerce.date();
