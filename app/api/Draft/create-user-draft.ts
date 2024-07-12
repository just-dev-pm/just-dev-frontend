import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import useSWRMutation from "swr/mutation";

/** @key [/api/users,{user_id},/drafts] */

export function useUserDraftCreate({
  user_id,
}: {
  user_id: string;
}) {
  const {toast} = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error, trigger } = useSWRMutation(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, draft_id, urlSuffix],{arg:name}:{arg:string}) =>
      fetch(BASE_URL + urlPrefix + draft_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),{
        onError(error){
          toast({description:"创建失败"})
        },
        onSuccess(data){
          toast({description:"创建成功"})
        }
      }
  );
  return {
    data,
    error,
    trigger,
  };
}
