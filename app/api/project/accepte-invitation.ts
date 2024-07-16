import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import useSWRMutation from "swr/mutation";

/** @key [/api/invitation/accept] */

export default function useAccepteInvitation({
  invitation_token,
}: {
  invitation_token: string;
}) {
  const {toast} = useToast();
  const urlPrefix = `/api/invitation/accept`;
  const { data, error, trigger } = useSWRMutation(
    invitation_token ? [urlPrefix] : null,
    ([urlPrefix]) =>
      fetch(BASE_URL + urlPrefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({invitation_token}),
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),{
        onError(){
          toast({description:"加入失败"})
        },
        onSuccess(){
          toast({description:"加入成功"})
        }
      }
  );
  return {
    data,
    error,
    trigger,
  };
}
