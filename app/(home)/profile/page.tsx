"use client";

import { ProfileView } from "./components/profile-view";
import { Suspense, useEffect } from "react";
import Loading from "@/components/ui/loading";
import { useProfile } from "@/app/api/user/get-profile";

export default function ProfilePage() {
  const { profile, mutate } = useProfile();
  useEffect(() => {
    mutate();
  }, []);
  if (!profile?.id) return <Loading />;
  return <ProfileView userData={profile} />;
}
