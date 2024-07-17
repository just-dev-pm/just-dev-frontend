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

export const UserSchema = z.object({
    avatar: z.union([z.null(), z.string()]).optional(),
    email: z.union([z.null(), z.string()]).optional(),
    id: z.string(),
    status_pool: z.union([StatusPoolSchema, z.null()]).optional(),
    username: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const ProjectUsersResponseSchema = z.object({
    users: z.array(UserSchema),
});
export type ProjectUsersResponse = z.infer<typeof ProjectUsersResponseSchema>;
