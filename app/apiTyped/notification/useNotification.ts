import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/users/,{user_id},/notifications] */

import * as z from "zod";

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

export const AssetSchema = z.object({
  path: PathSchema,
  source: SourceSchema,
});
export type Asset = z.infer<typeof AssetSchema>;

export const NotificationSchema = z.object({
  asset: AssetSchema,
  content: z.string(),
  handled: z.boolean(),
  id: z.string(),
  title: z.string(),
});
export type Notification = z.infer<typeof NotificationSchema>;

export const ResponseSchema = z.object({
  notifications: z.array(NotificationSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useNotifications(user_id: string) {
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/notifications`;
  const { data, error, isLoading, mutate } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取通知"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { notifications: [] } },
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
