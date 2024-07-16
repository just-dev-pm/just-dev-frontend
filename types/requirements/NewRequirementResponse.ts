import * as z from "zod";

export const NewRequirementResponseSchema = z.object({
    content: z.string(),
    id: z.string(),
    name: z.string(),
});
export type NewRequirementResponse = z.infer<
    typeof NewRequirementResponseSchema
>;
