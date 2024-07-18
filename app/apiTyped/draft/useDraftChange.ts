import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key [/api/drafts,{draft_id}] */

import * as z from "zod";

export const RequestSchema = z.object({
  name: z.union([z.null(), z.string()]).optional(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export function useDraftChange(
  draft_id: string,
  onSuccess?: (data?: any) => void,
) {
  const urlPrefix = `/api/drafts/`;
  const { toast } = useToast();
  const { data, error, trigger, isMutating } = useSWRMutation(
    draft_id ? [urlPrefix, draft_id] : null,
    ([urlPrefix, draft_id], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + draft_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改草稿"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(err, key, config) {
        toast({ description: "修改失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "修改成功" });
        if(onSuccess) onSuccess(data)
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
