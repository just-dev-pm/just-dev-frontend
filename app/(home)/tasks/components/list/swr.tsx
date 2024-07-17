import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";

function Swr() {
  const userId = useUserStore.getState().userId;
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/task_lists`;
  const { data, isLoading, mutate } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, userId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: false, refreshInterval: 5000 },
  );

  return { data, isLoading, mutate };
}

export { Swr as useSWRTaskLists };
