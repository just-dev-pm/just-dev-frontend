import * as z from "zod";

export const NewDraftResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
});
export type NewDraftResponse = z.infer<typeof NewDraftResponseSchema>;
