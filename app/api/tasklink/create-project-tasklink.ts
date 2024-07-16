/** @key [/api/projects/,{project_id},/links] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export interface Request {
  category: TaskRelationType;
  from: From;
  to: To;
  [property: string]: any;
}
export enum TaskRelationType {
  Auto = "auto",
  Dep = "dep",
}
export interface From {
  id: string;
  pr?: Frompr;
  [property: string]: any;
}

export interface Frompr {
  owner: string;
  pull_number: number;
  repo: string;
  [property: string]: any;
}

export interface To {
  id: string;
  pr?: Topr;
  [property: string]: any;
}

export interface Topr {
  owner: string;
  pull_number: number;
  repo: string;
  [property: string]: any;
}

export default function useProjectTaskLink({
  project_id,
}: {
  project_id: string;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/links`;
  const { data, error, trigger } = useSWRMutation(
    project_id ? [urlPrefix, project_id, urlSuffix] : null,
    ([urlPrefix, project_id, urlSuffix], { arg }: { arg: Request }) =>
      fetch(BASE_URL + urlPrefix + project_id + urlSuffix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("创建项目任务关联"))
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
