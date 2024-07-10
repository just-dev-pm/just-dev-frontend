"use client";

import useSWR from "swr";
import { ProfileView } from "./components/profile-view";
import { testBaseUrl } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { Suspense } from "react";
const userData = {
  id: "12345",
  username: "johndoe",
  email: "johndoe@example.com",
  avatar: "https://github.com/shadcn.png",
};
export default function ProfilePage() {
  const userId = useUserStore((state) => state.userId);
  console.log(userId);
  const url = `/api/users/`;
  const { data, error } = useSWR(
    [url, userId],
    ([url, userId]) =>
      fetch(testBaseUrl + url + userId, {
        credentials: "include",
      }).then((res) => res.json()),{suspense:true,fallbackData:{username:""}}
  );

  // if (!data) return <div>Loading...</div>
  return (
    <>
    <Suspense fallback={<div>loading...</div>} ><ProfileView userData={data} /></Suspense>      
    </>
  );
}
