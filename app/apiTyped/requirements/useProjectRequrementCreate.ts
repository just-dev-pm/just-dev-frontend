import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key /api/projects/{project_id}/requirements */

import * as z from "zod";

export const RequestSchema = z.object({
  content: z.string(),
  name: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  content: z.string(),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useRequirementCreate(
  project_id: string,
  onSuccess?: (data: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/requirements`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建需求"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess: (data) => {
        toast({ description: "创建成功" });
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
