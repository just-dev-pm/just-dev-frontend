"use client";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { Project } from "@/types/project";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
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
  description: z.string(),
  github: z.union([z.number(), z.null()]).optional(),
  name: z.string(),
  status_pool: z.union([RequestStatusPoolSchema, z.null()]).optional(),
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
export type Incomplete = z.infer<typeof ResponseIncompleteSchema>;

export const ResponseStatusPoolSchema = z.object({
  complete: ResponseStatusContentSchema,
  incomplete: z.array(ResponseIncompleteSchema),
});
export type StatusPool = z.infer<typeof ResponseStatusPoolSchema>;

export const ResponseSchema = z.object({
  avatar: z.union([z.null(), z.string()]).optional(),
  description: z.string(),
  github: z.union([z.number(), z.null()]).optional(),
  id: z.string(),
  name: z.string(),
  status_pool: z.union([ResponseStatusPoolSchema, z.null()]).optional(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useProjectCreate(onSuccess?: (data?: any) => void) {
  const { toast } = useToast();
  const url = `/api/projects`;
  const { data, error, isMutating, trigger } = useSWRMutation(
    url,
    (url, { arg }: { arg: Response }) =>
      fetch(BASE_URL + url, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("创建项目"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError(err, key, config) {
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
    isMutating,
    trigger,
  };
}
