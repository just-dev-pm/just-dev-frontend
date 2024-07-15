"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

// /api/projects/{project_id}/requirements/{requirement_id}
export const useChangeRequirements = (project_id: string) => {
  const { trigger } = useSWRMutation(
    ["/api/projects", project_id, "/requirements"],
    ([url1, project_id, url2], { arg }: { arg: string }) =>
      fetch(`${BASE_URL}${url1}/${project_id}${url2}/${arg}`, {
        method: "PATCH",
        body: JSON.stringify(arg),

        credentials: "include",
      }).then(handleResponse("修改需求"))
  );
  return {
    trigger,
  };
};
