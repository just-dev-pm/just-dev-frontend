import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key [/api/invitation/accept] */

import * as z from "zod";

export const RequestSchema = z.object({
  invitation_token: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export default function useAccepteInvitation({
  onSuccess,
}: {
  onSuccess?: (data?: any) => void;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/invitation/accept`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    [urlPrefix],
    ([urlPrefix],{arg}:{arg:Request}) =>
      fetch(BASE_URL + urlPrefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("接受邀请"))
        .then((res) => res),
    {
      onError(error, key, config) {
        toast({ description: "加入失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "加入成功" });
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
