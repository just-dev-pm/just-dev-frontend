import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRImmutable from "swr/immutable";

export const useInvitation = (token: string) => {
  const { data, mutate, error, isLoading } = useSWRImmutable<
    GetInvitationResponse,
    Error
  >(
    ["/api/invitation/", token],
    ([url, token]) =>
      fetch(`${BASE_URL}${url}${token}`, {
        credentials: "include",
      })
        .then(handleResponse("查看邀请信息时"))
        .then((res) => res.json()),
    { fallbackData: { invitor_id: "", project_name: "" } }
  );
  return { data, error, mutate, isLoading };
};
