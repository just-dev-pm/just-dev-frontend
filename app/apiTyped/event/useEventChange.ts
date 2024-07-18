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
  description: z.union([z.null(), z.string()]).optional(),
  end_time: z.union([z.null(), z.string()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  participants: z
    .union([z.array(RequestParticipantSchema), z.null()])
    .optional(),
  start_time: z.union([z.null(), z.string()]).optional(),
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

export default function useEVentChange(
  agenda_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events/`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    [urlPrefix, agenda_id, urlSuffix],
    (
      [urlPrefix, agenda_id, urlSuffix],
      { arg }: { arg: { res: Request; event_id: string } },
    ) =>
      fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix + arg.event_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg.res),
        credentials: "include",
      })
        .then(handleResponse("修改事件"))
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
    trigger,
    isMutating,
  };
}
