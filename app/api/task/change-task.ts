/** @key [/api/task_lists/,{task_list_id},/tasks/,{task_id}] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

export interface Request {
  assignees?: Assignee[];
  deadline?: string;
  description?: string;
  name?: string;
  pr: PR;
  status?: Status;
  [property: string]: any;
}

export interface Assignee {
  id: string;
  [property: string]: any;
}

export interface PR {
  owner: string;
  pull_number: number;
  repo: string;
  title: string;
  [property: string]: any;
}

export interface Status {
  category: Category;
  id?: string;
  [property: string]: any;
}

export enum Category {
  Complete = "complete",
  Incomplete = "incomplete",
}

export default function useTaskChange({
  task_list_id,
}: {
  task_list_id: string;
}) {
  const { toast } = useToast();
  const urlPrefix = `/api/task_lists/`;
  const urlMidfix = `/tasks/`;
  console.log(task_list_id)
  const { data, error, trigger } = useSWRMutation(
    task_list_id
      ? [urlPrefix, task_list_id, urlMidfix]
      : null,
    (
      [urlPrefix, task_list_id, urlMidfix],
      { arg }: { arg: {res:Request,task_id:string} }
    ) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlMidfix + arg.task_id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(arg.res),
        credentials: "include",
      })
        .then(handleResponse("修改任务"))
        .then((res) => res.json()),
    {
      onError() {
        toast({ description: "修改失败" });
      },
      onSuccess() {
        toast({ description: "修改成功" });
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
