/** @key [/api/agendas/,{agenda_id},/events] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestParticipantSchema = z.object({
  id: z.string(),
});
export type RequestParticipant = z.infer<typeof RequestParticipantSchema>;

export const RequestSchema = z.object({
  description: z.string(),
  end_time: z.string(),
  name: z.string(),
  participants: z.array(RequestParticipantSchema),
  start_time: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseParticipantSchema = z.object({
  id: z.string(),
});
export type ResponseParticipant = z.infer<typeof ResponseParticipantSchema>;

export const ResponseSchema = z.object({
  description: z.string(),
  end_time: z.string(),
  id: z.string(),
  name: z.string(),
  participants: z.array(ResponseParticipantSchema),
  start_time: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useEventCreate(
  agenda_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events`;
  const { data, error, trigger } = useSWRMutation(
    agenda_id ? [urlPrefix, agenda_id, urlSuffix] : null,
    ([urlPrefix, agenda_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("添加事件"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(error, key, config) {
        toast({ description: "添加失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "添加成功" });
        if (onSuccess) onSuccess(data);
      },
    },
  );
  return {
    data,
    error,
    trigger,
  };
}
