import { UserData } from "@/app/(home)/profile/components/edit-profile-form";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

import * as z from "zod";

export const RequestStatusContentSchema = z.object({
  description: z.string(),
  name: z.string(),
});
export type RequestStatusContent = z.infer<typeof RequestStatusContentSchema>;

export const RequestIncompleteSchema = z.object({
  id: z.string(),
  status: RequestStatusContentSchema,
});
export type RequestIncomplete = z.infer<typeof RequestIncompleteSchema>;

export const RequestStatusPoolSchema = z.object({
  complete: RequestStatusContentSchema,
  incomplete: z.array(RequestIncompleteSchema),
});
export type RequestStatusPool = z.infer<typeof RequestStatusPoolSchema>;

export const RequestSchema = z.object({
  avatar: z.union([z.null(), z.string()]).optional(),
  email: z.union([z.null(), z.string()]).optional(),
  status_pool: z.union([RequestStatusPoolSchema, z.null()]).optional(),
  username: z.string(),
});
export type Request = z.infer<typeof RequestSchema>;

export const ResponseStatusContentSchema = z.object({
  description: z.string(),
  name: z.string(),
});
export type ResponseStatusContent = z.infer<typeof ResponseStatusContentSchema>;

export const ResponseIncompleteSchema = z.object({
  id: z.string(),
  status: ResponseStatusContentSchema,
});
export type ResponseIncomplete = z.infer<typeof ResponseIncompleteSchema>;

export const ResponseStatusPoolSchema = z.object({
  complete: ResponseStatusContentSchema,
  incomplete: z.array(ResponseIncompleteSchema),
});
export type ResponseStatusPool = z.infer<typeof ResponseStatusPoolSchema>;

export const ResponseSchema = z.object({
  avatar: z.union([z.null(), z.string()]).optional(),
  email: z.union([z.null(), z.string()]).optional(),
  id: z.string(),
  status_pool: z.union([ResponseStatusPoolSchema, z.null()]).optional(),
  username: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useUserInfoChange(onSuccess?: (data?: any) => void) {
  const { toast } = useToast();
  const userId = useUserStore.getState().userId;
  const url = "/api/users";
  const { data, error, trigger, isMutating } = useSWRMutation(
    userId ? [url] : null,
    ([url], { arg }: { arg: Request }) =>
      fetch(BASE_URL + url + userId, {
        method: "PATCH",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("修改用户信息"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(data, key, config) {
        toast({ description: "修改失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "修改成功" });
        if(onSuccess) onSuccess(data)
      },
    },
  );
  return { data, error, trigger, isMutating };
}
