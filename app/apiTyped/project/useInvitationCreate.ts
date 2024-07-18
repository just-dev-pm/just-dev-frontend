import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRImmutable from "swr/immutable";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestSchema = z.object({
  invitee_id: z.string(),
  invitor_id: z.string(),
  project_id: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  invitation_token: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useInvitationCreate(
    onSuccess?: (data?: any) => void,
){
  const url = `/api/invitation/generate`;
  const {toast} = useToast()
  const { data, trigger, error, isMutating } = useSWRMutation(
    [url],
    ([url], { arg }: { arg: Request }) =>
      fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("生成邀请token"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
        {
            onError(err, key, config) {
                toast({description:"生成失败"})
            },
            onSuccess(data, key, config) {
                toast({description:"生成成功"})
                onSuccess ? onSuccess(data) : undefined;
            },
        }
  );
  return { data, trigger, error, isMutating };
};
