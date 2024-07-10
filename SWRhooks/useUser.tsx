import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

// type Props = {
//     name:string;
//     password:string;
// }

export function useUser(url: string) {
  const setUserId = useUserStore(stats => stats.setUserId);
  const setUserName = useUserStore(stats => stats.setUserName);
  const setAvatar = useUserStore(stats => stats.setAvatar);
  const setEmail = useUserStore(stats => stats.setEmail);
  const setStatusPool = useUserStore(stats => stats.setStatusPool);

  const fetcher = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(arg),
      credentials: "include",
    });
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.status = res.status;
      throw error;
    }
    return res.json();
  };
  const { data, error, trigger } = useSWRMutation(
    `${BASE_URL}${url}`,
    fetcher,
    {
      onSuccess(data, key, config) {
        if (data) {
          setUserId(data.id);
          setUserName(data.username);
          data.avatar && setAvatar(data.avatar);
          data.email && setEmail(data.email);
          data.status_pool && setStatusPool(data.status_pool);
        }
      },
    }
  );
  return {
    data,
    error,
    trigger,
  };
}
