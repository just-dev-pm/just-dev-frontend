import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import useSWRImmutable from "swr";

import * as z from "zod";

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

export default function useUserInfo(userId: string) {
  const url = `/api/users/`;
  const { data, error, isLoading,mutate } = useSWR(
    userId ? [url, userId] : null,
    ([url, user_Id]) =>
      fetch(BASE_URL + url + user_Id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取用户信息"))
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      suspense: true,
      fallbackData: { username: "", avatar: "", id: "", email: "" },
    },
  );
  return {
    data,
    error,
    isLoading,
    mutate
  };
}
