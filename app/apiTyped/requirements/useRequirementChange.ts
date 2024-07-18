"use client";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

// /api/projects/{project_id}/requirements/{requirement_id}

import * as z from "zod";

export const RequestSchema = z.object({
  content: z.union([z.null(), z.string()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  content: z.string(),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export const useRequirementsChange = (
  project_id: string,
  requirement_id: string,
  onSuccess?: (data: any) => void,
) => {
  const urlPrefix = `/api/projects/`;
  const urlMidfix = `/requirements/`;
  const { toast } = useToast();
  const { data, error, isMutating, trigger } = useSWRMutation(
    project_id && requirement_id
      ? [urlPrefix, project_id, urlMidfix, requirement_id]
      : null,
    ([urlPrefix, project_id, urlMidfix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + project_id + urlMidfix + requirement_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改需求"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(err, key, config) {
        toast({ description: "修改失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "修改成功" });
        if (onSuccess) onSuccess(data);
      },
    },
  );
  return {
    data,
    error,
    isMutating,
    trigger,
  };
};
