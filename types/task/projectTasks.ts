import * as z from "zod";

export const CategorySchema = z.enum(["complete", "incomplete"]);
export type Category = z.infer<typeof CategorySchema>;

export const StatusSchema = z.object({
    category: CategorySchema,
    id: z.union([z.null(), z.string()]).optional(),
});
export type Status = z.infer<typeof StatusSchema>;

export const PrSchema = z.object({
    owner: z.string(),
    pull_number: z.number(),
    repo: z.string(),
});
export type Pr = z.infer<typeof PrSchema>;

export const AssigneeSchema = z.object({
    id: z.string(),
});
export type Assignee = z.infer<typeof AssigneeSchema>;

export const TaskSchema = z.object({
    assignees: z.array(AssigneeSchema),
    deadline: z.date(),
    description: z.string(),
    id: z.string(),
    name: z.string(),
    pr: z.union([PrSchema, z.null()]).optional(),
    status: StatusSchema,
    task_list_id: z.string(),
});
export type Task = z.infer<typeof TaskSchema>;

export const ProjectTasksResponseSchema = z.object({
    tasks: z.array(TaskSchema),
});
export type ProjectTasksResponse = z.infer<typeof ProjectTasksResponseSchema>;
