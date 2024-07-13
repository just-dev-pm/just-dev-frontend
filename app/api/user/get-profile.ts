"use client";
import { UserData } from "@/app/(home)/profile/components/edit-profile-form";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWRImmutable from "swr/immutable";

export const useProfile = () => {
  const userId = useUserStore.getState().userId;
  const { data: profile, mutate } = useSWRImmutable(
    "/api/users",
    url =>
      fetch(`${BASE_URL}${url}/${userId}`, {
        credentials: "include",
      }).then(res => res.json()),
    { fallbackData: { username: "", avatar: "", email: "", id: "" } }
  );
  return { profile, mutate };
};
