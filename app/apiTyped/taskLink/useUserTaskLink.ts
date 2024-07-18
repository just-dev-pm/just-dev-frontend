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

export const RequestToSchema = z.object({
  id: z.string(),
});
export type RequestTo = z.infer<typeof RequestToSchema>;

export const RequestFromSchema = z.object({
  id: z.string(),
});
export type RequestFrom = z.infer<typeof RequestFromSchema>;

export const RequestSchema = z.object({
  category: RequestTaskRelationTypeSchema,
  from: RequestFromSchema,
  to: RequestToSchema,
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

export default function useUserTaskLinkCreate(
  user_id: string,
  onSuccess?: (data?: any) => void,
) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/links`;
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
        .then(handleResponse("创建用户任务关联"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess() {
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
