/** @key [/api/users/,{user_id},/agendas] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

type event = {
  id: string;
};

export default function useUserAgendaCreate({ user_id }: { user_id: string }) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/agendas`;
  const { data, error, trigger } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    (
      [urlPrefix, user_id, urlSuffix],
      { arg }: { arg: { name: string; events: event[] } }
    ) =>
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
      onError(error) {
        toast({ description: "创建失败" });
      },
      onSuccess(data) {
        toast({ description: "创建成功" });
      },
    }
  );
  return {
    data,error,trigger
  }
}
