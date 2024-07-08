"use client";
import { useEffect, useState } from "react";
import InvitationView, { InvitationData } from "../components/invitation-view";

interface IProps {
  params: { invitation_id: string };
}

export default function InvitePage({ params }: IProps) {
  const { invitation_id } = params;
  const [data, setData] = useState<InvitationData | null>(null);

  useEffect(() => {
    async function fetchInvitation() {
      // const res = await fetch(`/api/invitation/${invitation_id}`);
      // const result = await res.json();
      const result: InvitationData = {
        invitee: "Dawn Chan",
        inviter: "Dawn Chan",
        project: "Just Dev",
      };
      setData(result);
    }
    fetchInvitation();
  }, [invitation_id]);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return <InvitationView data={data} />;
}
