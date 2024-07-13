"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { Project } from "@/types/project";
import { CreateProjectFormSchema } from "@/types/project/create-project-form";
import useSWRMutation from "swr/mutation";

export const useProjectCreate = () => {
  const { trigger } = useSWRMutation(
    "/api/projects",
    (url, { arg }: { arg: CreateProjectFormSchema }) =>
      fetch(`${BASE_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(handleResponse("创建项目"))
  );
  return {
    trigger,
  };
};
