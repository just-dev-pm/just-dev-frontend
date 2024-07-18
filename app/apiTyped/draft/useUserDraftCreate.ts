import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key [/api/users,{user_id},/drafts] */

import * as z from "zod";

export const RequestSchema = z.object({
  name: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export function useUserDraftCreate(
  user_id: string,
  onSuccess: (data: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error, trigger } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, draft_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + draft_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建个人草稿"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(error, key, config) {
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
  };
}
