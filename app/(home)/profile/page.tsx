"use client";

import useSWR from "swr";
import { ProfileView } from "./components/profile-view";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { Suspense } from "react";
import { useUserInfo } from "@/app/api/useUserInfo";
const userData = {
  id: "12345",
  username: "johndoe",
  email: "johndoe@example.com",
  avatar: "https://github.com/shadcn.png",
};
export default function ProfilePage() {
  const { data, error } = useUserInfo();
  // if (!data) return <div>Loading...</div>
  return error ? (
    <div>{error}</div>
  ) : (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <ProfileView userData={data} />
      </Suspense>
    </>
  );
}
