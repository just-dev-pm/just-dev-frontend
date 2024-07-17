"use client";

/** @key /api/projects/{project_id} */

import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

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

export const ResponseSchema = z.object({
  avatar: z.union([z.null(), z.string()]).optional(),
  description: z.string(),
  github: z.union([z.number(), z.null()]).optional(),
  id: z.string(),
  name: z.string(),
  status_pool: z.union([StatusPoolSchema, z.null()]).optional(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useProjectInfo(projectId: string) {
  const urlPrefix = `/api/projects/`;
  const { data, mutate, error, isLoading } = useSWR(
    projectId ? [urlPrefix, projectId] : null,
    ([url, projectId]) =>
      fetch(BASE_URL + urlPrefix + projectId, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取项目信息"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      fallbackData: {
        id: "",
        description: "",
        name: "",
        github: 0,
        status_pool: {
          complete: { name: "", description: "" },
          incomplete: [],
        },
      },
    },
  );

  return { data, mutate, error, isLoading };
}
