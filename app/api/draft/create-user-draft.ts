import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

/** @key [/api/users,{user_id},/drafts] */

export function useUserDraftCreate({
    user_id,
    onSuccess,
}: {
    user_id: string;
    onSuccess?: (data?: any) => void;
}) {
    const { toast } = useToast();
    const urlPrefix = `/api/users/`;
    const urlSuffix = `/drafts`;
    const { data, error, trigger } = useSWRMutation(
        user_id ? [urlPrefix, user_id, urlSuffix] : null,
        (
            [urlPrefix, draft_id, urlSuffix],
            { arg }: { arg: { name: string } }
        ) =>
            fetch(BASE_URL + urlPrefix + draft_id + urlSuffix, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(arg),
                credentials: "include",
            })
                .then(handleResponse("创建个人草稿"))
                .then((res) => res.json()),
        {
            onError(error) {
                toast({ description: "创建失败" });
            },
            onSuccess(data) {
                toast({ description: "创建成功" });
                if (onSuccess) onSuccess(data);
            },
        }
    );
    return {
        data,
        error,
        trigger,
    };
}
