import { useToast } from "@/components/ui/use-toast";
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

export const RequestSchema = z.object({
  name: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export function useProjectDraftCreate(
  project_id: string,
  onSuccess?: (data: any) => void
) {
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/drafts`;
  const { toast } = useToast();
  const { data, error, trigger, isMutating } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix], { arg }: { arg: Request }) =>
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
      onError(err, key, config) {
        toast({ description: "创建失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "创建成功" });
        onSuccess ? onSuccess(data) : undefined;
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
