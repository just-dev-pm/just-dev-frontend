"use client";
import { useEffect, useState } from "react";
import InvitationView, { InvitationData } from "../components/invitation-view";
import useAccepteInvitation from "@/app/api/project/accepte-invitation";
import { useInvitation } from "@/app/api/project/get-invitation";
import { useUserStore } from "@/store/userStore";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { MyError } from "@/lib/handle-response";
import { useRouter } from "next/navigation";

interface IProps {
  params: { invitation_token: string };
}

export default function InvitePage({ params }: IProps) {
  const router = useRouter();
  const { invitation_token } = params;
  const { trigger } = useAccepteInvitation({ invitation_token });
  const {
    data: invitation_data,
    error,
    mutate,
  } = useInvitation(invitation_token);

  useEffect(() => {
    mutate();
  }, []);

  if (error)
    return (
      <AlertDestructive
        title={(error as unknown as MyError).when + "发生错误"}
        description={(error as unknown as MyError).info}
      />
    );

  if (!invitation_data?.invitor_id)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <InvitationView
      data={{
        ...invitation_data,
        invitee_id: useUserStore.getState().userId,
      }}
      onJoin={() => {
        trigger();
        router.push("/dashboard")
      }}
    />
  );
}
