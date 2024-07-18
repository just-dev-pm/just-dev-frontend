"use client";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

import { z } from "zod";

const taskSchema = z
  .object({
    source: z.literal("task").describe("通知源"),
    path: z
      .union([
        z
          .object({
            task_list_id: z.string(),
            task_id: z.string(),
            project_id: z.string(),
          })
          .describe("项目任务")
          .strict(),
        z
          .object({
            task_list_id: z.string(),
            task_id: z.string(),
          })
          .describe("个人任务")
          .strict(),
      ])
      .describe("任务路径"),
  })
  .strict();

const draftSchema = z
  .object({
    source: z.literal("draft").describe("通知源"),
    path: z
      .union([
        z
          .object({
            project_id: z.string(),
            draft_id: z.string(),
          })
          .describe("项目草稿")
          .strict(),
        z
          .object({
            draft_id: z.string(),
          })
          .describe("个人草稿")
          .strict(),
      ])
      .describe("草稿路径"),
  })
  .strict();

const eventSchema = z
  .object({
    source: z.literal("event").describe("通知源"),
    path: z
      .union([
        z
          .object({
            project_id: z.string(),
            agenda_id: z.string(),
            event_id: z.string(),
          })
          .describe("项目事件")
          .strict(),
        z
          .object({
            agenda_id: z.string(),
            event_id: z.string(),
          })
          .describe("个人事件")
          .strict(),
      ])
      .describe("事件路径"),
  })
  .strict();

const AssetSchema = z
  .union([taskSchema, draftSchema, eventSchema])
  .describe("资产");

export const SourceSchema = z.enum(["draft", "event", "task"]);
export type Source = z.infer<typeof SourceSchema>;

export const PathSchema = z.object({
  project_id: z.union([z.null(), z.string()]).optional(),
  task_id: z.union([z.null(), z.string()]).optional(),
  task_list_id: z.union([z.null(), z.string()]).optional(),
  draft_id: z.union([z.null(), z.string()]).optional(),
  agenda_id: z.union([z.null(), z.string()]).optional(),
  event_id: z.union([z.null(), z.string()]).optional(),
});
export type Path = z.infer<typeof PathSchema>;

export const ResponseSchema = z.object({
  asset: AssetSchema,
  content: z.string(),
  handled: z.boolean(),
  id: z.string(),
  title: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useNotificationsChange(
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const userId = useUserStore.getState().userId;
  const urlPrefix = `/api/users/`;
  const urlMidfix = `/notifications/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    userId ? [urlPrefix, userId, urlMidfix] : null,
    ([urlPrefix, userId, urlMidfix], { arg }: { arg: string }) =>
      fetch(BASE_URL + urlPrefix + userId + urlMidfix + arg, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("标记通知"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(err, key, config) {
        toast({ description: "标记失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "标记成功" });
        if (onSuccess) onSuccess(data);
      },
    },
  );
  return {
    data,
    error,
    trigger,
    isMutating,
  };
}
