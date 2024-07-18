import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestSchema = z.object({
  password: z.string(),
  username: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const StatusContentSchema = z.object({
  description: z.string(),
  name: z.string(),
});
export type StatusContent = z.infer<typeof StatusContentSchema>;

export const IncompleteSchema = z.object({
  id: z.string(),
  status: StatusContentSchema,
});
export type Incomplete = z.infer<typeof IncompleteSchema>;

export const StatusPoolSchema = z.object({
  complete: StatusContentSchema,
  incomplete: z.array(IncompleteSchema),
});
export type StatusPool = z.infer<typeof StatusPoolSchema>;

export const ResponseSchema = z.object({
  avatar: z.union([z.null(), z.string()]).optional(),
  email: z.union([z.null(), z.string()]).optional(),
  id: z.string(),
  status_pool: z.union([StatusPoolSchema, z.null()]).optional(),
  username: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export function useSignUp(onSuccess?: (data?: any) => void) {
  const { toast } = useToast();
  const url = `/api/auth/signup`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    [url],
    ([], { arg }: { arg: Request }) =>
      fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("注册"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(data,key,config) {
        toast({ description: "注册失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "注册成功" });
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
