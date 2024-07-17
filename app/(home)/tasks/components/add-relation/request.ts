import { z } from "zod";

const schema = z.object({
  from: z.object({
    id: z.string().min(1, "不能为空"),
  }),
  to: z.object({
    id: z.string().min(1, "不能为空"),
  }),
  category: z.enum(["auto", "dep"]).default("auto"),
});

type Schema = z.infer<typeof schema>;

export { schema as newRelationSchema, type Schema as NewRelationSchema };
