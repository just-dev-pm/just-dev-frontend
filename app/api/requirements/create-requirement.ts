import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

type Prop = {
  name: string;
  content: string;
};

/** @key /api/projects/{project_id}/requirements */

export default function useRequirementCreate({
  project_id,
}: {
  project_id: string;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/requirements`;
  const { data, error, trigger } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    (
      [urlPrefix, project_id, urlSuffix],
      { arg: { name, content } }: { arg: Prop }
    ) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name, content }),
        credentials: "include",
      })
        .then(handleResponse("创建需求"))
        .then((res) => res.json()),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess() {
        toast({ description: "创建成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
