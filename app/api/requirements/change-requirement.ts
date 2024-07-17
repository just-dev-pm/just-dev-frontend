"use client";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

// /api/projects/{project_id}/requirements/{requirement_id}
export const useRequirementsChange = ({
  project_id,
  requirement_id,
}: {
  project_id: string;
  requirement_id: string;
}) => {
  const urlPrefix = `/api/projects/`;
  const urlMidfix = `/requirements/`;
  const { trigger } = useSWRMutation(
    project_id && requirement_id
      ? [urlPrefix, project_id, urlMidfix, requirement_id]
      : null,
    (
      [urlPrefix, project_id, urlMidfix],
      { arg }: { arg: { name: string; content: string } }
    ) =>
      fetch(BASE_URL + urlPrefix + project_id + urlMidfix + requirement_id, {
        method: "PATCH",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(arg),
        credentials: "include",
      })
        .then(handleResponse("修改需求"))
        .then((res) => res.json())
  );
  return {
    trigger,
  };
};
