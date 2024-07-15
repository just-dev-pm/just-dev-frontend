import { z } from "zod";

// /api/projects/{project_id}/requirements/{requirement_id}

export interface NewRequirements {
  /**
   * 需求内容
   *
   * @maxLength 150 最大不能超过150字
   */
  content?: string;
  /**
   * 名称
   *
   * @minLength 1 需求名称不能为空
   */
  name?: string;
}

export const newRequirementsSchema = z.object({
  content: z.string().max(150, "最大不能超过150字"),
  name: z.string().min(1, "需求名称不能为空"),
});

export type NewRequirementsSchema = z.infer<typeof newRequirementsSchema>;
