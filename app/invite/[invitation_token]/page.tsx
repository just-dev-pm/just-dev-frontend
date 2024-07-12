"use client";
import { useEffect, useState } from "react";
import InvitationView, { InvitationData } from "../components/invitation-view";
import useAccepteInvitation from "@/app/api/project/accepte-invitation";
import { useInvitation } from "@/app/api/project/get-invitation";
import { useUserStore } from "@/store/userStore";

interface IProps {
  params: { invitation_token: string };
}

export default function InvitePage({ params }: IProps) {
  const { invitation_token } = params;
  const { trigger } = useAccepteInvitation({ invitation_token });
  const {
    data: invitation_data,
    error: invitation_error,
    mutate,
  } = useInvitation(invitation_token);

  useEffect(() => {
    mutate();
  }, []);

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
      }}
    />
  );
}
