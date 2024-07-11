import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWRMutation from "swr/mutation";

// type Props = {
//     name:string;
//     password:string;
// }

export function useUserIn(url: string) {
  const setUserId = useUserStore((stats) => stats.setUserId);

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
