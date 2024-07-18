import { z } from "zod";
import { statusSchema } from "../form/create-task-context";

export const changeStatusSchema = z.object({
  status: statusSchema.default({ category: "complete" }),
});

export type ChangeStatusSchema = z.infer<typeof changeStatusSchema>;
