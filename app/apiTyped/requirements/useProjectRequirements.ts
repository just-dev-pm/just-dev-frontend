import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";

/** @key [/api/projects/,{project_id},/requirements] */

import * as z from "zod";


export const RequirementSchema = z.object({
    "content": z.string(),
    "id": z.string(),
    "name": z.string(),
});
export type Requirement = z.infer<typeof RequirementSchema>;

export const ResponseSchema = z.object({
    "requirements": z.array(RequirementSchema),
});
export type Response = z.infer<typeof ResponseSchema>;


export default function useProjectRequirements(project_id: string) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/requirements`;
  const { data, error, mutate, isLoading } = useSWR(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(handleResponse("获取项目需求"))
      .then(res => res.json())
      .then(res => ResponseSchema.parse(res)),
    { suspense: true, fallbackData: { requirements: [] } },
  );
  return {
    data,
    error,
    mutate,
    isLoading,
  };
}
