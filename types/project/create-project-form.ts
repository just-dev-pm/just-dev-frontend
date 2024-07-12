import { z } from "zod";
export const createProjectFormSchema = z.object({
  avatar: z.string().url().optional(),
  name: z.string(),
  description: z.string().email(),
  status_pool: z
    .object({
      complete: z.object({
        name: z.string(),
        description: z.string(),
      }),
      incomplete: z.array(
        z.object({
          id: z.string(),
          status: z.object({
            name: z.string(),
            description: z.string(),
          }),
        })
      ),
    })
    .optional(),
});

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>;
