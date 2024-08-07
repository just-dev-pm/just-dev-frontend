import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

type Prop = {
  name: string;
  content: string;
};

/** @key /api/projects/{project_id}/requirements */

import * as z from "zod";

export const ResponseSchema = z.object({
  content: z.string(),
  id: z.string(),
  name: z.string(),
});
export type Response = z.infer<typeof ResponseSchema>;

export default function useRequirementCreate({
  project_id,
  onSuccess,
}: {
  project_id: string;
  onSuccess?: (data: any) => void;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/projects/`;
  const urlSuffix = `/requirements`;
  const { data, error, trigger, isMutating } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    (
      [urlPrefix, project_id, urlSuffix],
      { arg: { name, content } }: { arg: Prop },
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
        .then((res) => res.json())
        .then((res) => ResponseSchema.parse(res)),
    {
      onError() {
        toast({ description: "创建失败" });
      },
      onSuccess: (data) => {
        toast({ description: "创建成功" });
        if (onSuccess) onSuccess(data);
      },
    },
  );
  return {
    data,
    error,
    trigger,
    isMutating,
  };
}
