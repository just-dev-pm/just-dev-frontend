import { BASE_URL } from "@/lib/global";
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
      }).then(res => {
        if (!res.ok) {
          const error = new Error();
          if (res.status >= 400 && res.status < 500) error.name = "auth";
          else error.name = "server";
          throw error;
        }
        return res.json();
      })
  );
  return {
    trigger,
  };
};
