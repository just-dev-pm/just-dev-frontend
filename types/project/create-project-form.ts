import { z } from "zod";
export const createProjectFormSchema = z.object({
  avatar: z.union([
    z.literal(""),
    z.string().trim().url({ message: "请输入正确的URL" }),
  ]),
  name: z.string().min(1, "项目名不能为空"),
  description: z.string().max(200, "项目描述不能超过200字符"),
  status_pool: z
    .object({
      complete: z.object({
        name: z.string({ message: "状态名不能为空" }),
        description: z.string().optional(),
      }),
      incomplete: z.array(
        z.object({
          id: z.string(),
          status: z.object({
            name: z.string({ message: "状态名不能为空" }),
            description: z.string(),
          }),
        })
      ),
    })
    .optional(),
});

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>;
