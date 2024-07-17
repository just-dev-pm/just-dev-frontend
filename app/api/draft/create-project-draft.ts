import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

/** @key [/api/projects,{project_id},/drafts] */

import * as z from "zod";

export const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export function useProjectDraftCreate({
  project_id,
  onSuccess,
}: {
  project_id: string;
  onSuccess?: (data: any) => void;
}) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/drafts`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix], { arg }: { arg: { name: string } }) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建项目草稿"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onSuccess: onSuccess ? (data) => onSuccess(data) : undefined,
    },
  );
  return {
    data,
    error,
    trigger,
    isMutating,
  };
}
