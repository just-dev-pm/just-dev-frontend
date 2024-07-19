"use client";

import { useProfile } from "@/app/api/user/get-profile";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";
import { StatusPoolProvider } from "../components/status/context";
import { ProfileView } from "./components/profile-view";

export default function ProfilePage() {
  const { profile, mutate } = useProfile();
  useEffect(() => {
    mutate();
  }, []);
  if (!profile?.id) return <Loading />;
  return (
    <>
      <StatusPoolProvider>
        <ProfileView userData={profile} />
      </StatusPoolProvider>
    </>
  );
}
