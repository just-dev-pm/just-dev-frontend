import { z } from "zod";

const schema = z.object({
  category: z.enum(["auto", "dep"]).default("auto"),
});

type Schema = z.infer<typeof schema>;

export { schema as changeRelationSchema, type Schema as ChangeRelationSchema };
