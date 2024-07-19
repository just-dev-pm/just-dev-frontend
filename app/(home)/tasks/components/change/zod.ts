import { z } from "zod";

export const changeTaskSchema = z.object({
  name: z.string().min(1, "任务名不能为空").default(""),
  description: z.string().min(1, "任务描述不能为空").default(""),
  asignees: z.array(z.object({ id: z.string() })).default([]),
  deadline: z.coerce.date(),
  pr: z.object({
    owner: z.string(),
    repo: z.string(),
    pull_number: z.coerce.number(),
  }),
});

export type ChangeTaskSchema = z.infer<typeof changeTaskSchema>;
export const dateSchema = z.coerce.date();
