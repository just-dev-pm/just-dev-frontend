import { BASE_URL } from "@/lib/global";
import useSWRImmutable from "swr/immutable";

export const useInvitation = (token: string) => {
  const { data, mutate, error } = useSWRImmutable<GetInvitationResponse, Error>(
    ["/api/invitation/", token],
    ([url, token]) =>
      fetch(`${BASE_URL}${url}${token}`, {
        credentials: "include",
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res;
        })
        .then(res => res.json()),
    { fallbackData: { invitor_id: "", project_id: "" } }
  );
  return { data, error, mutate };
};
