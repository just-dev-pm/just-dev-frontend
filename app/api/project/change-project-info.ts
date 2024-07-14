"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { Project } from "@/types/project";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
import useSWRMutation from "swr/mutation";

export const useChangeProject = (project_id: string) => {
  const { trigger } = useSWRMutation(
    ["/api/projects", project_id],
    ([url, project_id], { arg }: { arg: CreateProjectFormSchema }) =>
      fetch(`${BASE_URL}${url}/${project_id}`, {
        method: "PATCH",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(handleResponse("修改项目信息"))
  );
  return {
    trigger,
  };
};
