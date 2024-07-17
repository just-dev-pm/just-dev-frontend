import * as z from "zod";

export const StatusContentSchema = z.object({
    description: z.string(),
    name: z.string(),
});
export type StatusContent = z.infer<typeof StatusContentSchema>;
export const IncompleteSchema = z.object({
    id: z.string(),
    status: StatusContentSchema,
});
export type Incomplete = z.infer<typeof IncompleteSchema>;

export const StatusPoolSchema = z.object({
    complete: StatusContentSchema,
    incomplete: z.array(IncompleteSchema),
});
export type StatusPool = z.infer<typeof StatusPoolSchema>;

export const ProjectDataResponseSchema = z.object({
    avatar: z.union([z.null(), z.string()]).optional(),
    description: z.string(),
    github: z.union([z.number(), z.null()]).optional(),
    id: z.string(),
    name: z.string(),
    status_pool: z.union([StatusPoolSchema, z.null()]).optional(),
});
export type ProjectDataResponse = z.infer<typeof ProjectDataResponseSchema>;
