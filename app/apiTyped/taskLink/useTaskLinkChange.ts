import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";
import * as z from "zod";

// 关联类型，分组
//
// 任务关联类型

export const RequestTaskRelationTypeSchema = z.enum(["auto", "dep"]);
export type RequestTaskRelationType = z.infer<
  typeof RequestTaskRelationTypeSchema
>;

export const RequestSchema = z.object({
  category: RequestTaskRelationTypeSchema,
});
export type Request = z.infer<typeof RequestSchema>;

// 关联类型，分组
//
// 任务关联类型

export const ResponseTaskRelationTypeSchema = z.enum(["auto", "dep"]);
export type ResponseTaskRelationType = z.infer<
  typeof ResponseTaskRelationTypeSchema
>;

export const ResponseToSchema = z.object({
  id: z.string(),
});
export type ResponseTo = z.infer<typeof ResponseToSchema>;

export const ResponseFromSchema = z.object({
  id: z.string(),
});
export type ResponseFrom = z.infer<typeof ResponseFromSchema>;

export const ResponseSchema = z.object({
  category: ResponseTaskRelationTypeSchema,
  from: ResponseFromSchema,
  id: z.string(),
  to: ResponseToSchema,
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useTaskLinkChange(
  link_id: string,
  onSuccess?: (data?: any) => void,
) {
  const urlPrefix = `/api/links/`;
  const { toast } = useToast();
  const { data, error, trigger, isMutating } = useSWRMutation(
    link_id ? [urlPrefix, link_id] : null,
    ([urlPrefix, link_id], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + link_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改任务关联"))
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
