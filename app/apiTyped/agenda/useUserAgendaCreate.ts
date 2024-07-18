/** @key [/api/users/,{user_id},/agendas] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestEventSchema = z.object({
  id: z.string(),
});
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export const RequestSchema = z.object({
  events: z.array(RequestEventSchema),
  name: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseEventSchema = z.object({
  id: z.string(),
});
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponseSchema = z.object({
  events: z.array(ResponseEventSchema),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useUserAgendaCreate(
  user_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/agendas`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("创建个人日程"))
        .then((res) => res.json()),
    {
      onError(error, key, config) {
        toast({ description: "创建失败" });
      },
      onSuccess(data, key, config) {
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
