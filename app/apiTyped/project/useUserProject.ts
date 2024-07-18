import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import { error } from "console";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import * as z from "zod";

// 权限

export const PositionSchema = z.enum(["admin", "member"]);
export type Position = z.infer<typeof PositionSchema>;

export const ProjectSchema = z.object({
  github: z.union([z.number(), z.null()]).optional(),
  id: z.string(),
  position: PositionSchema,
});
export type Project = z.infer<typeof ProjectSchema>;

export const ResponseSchema = z.object({
  projects: z.array(ProjectSchema),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useUserProjects() {
  const userId = useUserStore.getState().userId;
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/projects`;
  const { data, error, mutate, isLoading } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        method:"GET",
        headers:{
            "Content-Type":"application/json; charset: UTF-8"
        },
        credentials: "include",
      })
        .then(handleResponse("获取用户关联的项目列表"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      suspense: true,
      fallbackData: { projects: [] },
    },
  );

  return { data, error, mutate, isLoading };
}
