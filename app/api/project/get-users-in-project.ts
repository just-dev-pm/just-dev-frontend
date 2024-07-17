import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/users] */

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

export const ResponseSchema = z.object({
  users: z.array(UserSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useUsersInProject({
  project_id,
}: {
  project_id: string;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/users`;
  const { data, error, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        credentials: "include",
      })
        .then(handleResponse("获取项目中的用户"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    { suspense: false, fallbackData: { users: [] } },
  );
  return {
    data,
    error,
    isLoading,
  };
}
