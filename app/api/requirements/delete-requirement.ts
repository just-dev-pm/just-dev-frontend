/** @key [/api/projects/,{project_id},/requirements/,{requirement_id}] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export default function useRequirementDelete({
  project_id,
}: {
  project_id: string;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/projects/`;
  const urlMidfix = `/requirements/`;
  const { data, error, trigger } = useSWRMutation(
    project_id
      ? [urlPrefix, project_id, urlMidfix]
      : null,
    ([urlPrefix, project_id, urlMidfix],{arg}:{arg:string}) =>
      fetch(BASE_URL + urlPrefix + project_id + urlMidfix + arg, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("删除需求"))
        .then((res) => res),
    {
      onError() {
        toast({ description: "删除失败" });
      },
      onSuccess() {
        toast({ description: "删除成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
