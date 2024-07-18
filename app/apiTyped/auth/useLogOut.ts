import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function useLogOut(onSuccess?: (data?: any) => void) {
  const url = `/api/auth/logout`;
  const { toast } = useToast();
  const { data, error, trigger, isMutating } = useSWRMutation(
    [url],
    () => {
      fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("登出"))
        .then((res) => res);
    },
    {
      onError(data, key, config) {
        toast({ description: "登出失败" });
      },
      onSuccess(data, key, config) {
        toast({ description: "登出成功" });
        onSuccess ? onSuccess(data) : undefined;
      },
    },
  );
  return {
    error,
    trigger,
    isMutating,
  };
}
