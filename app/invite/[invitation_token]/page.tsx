"use client";
import { useEffect, useState } from "react";
import InvitationView, { InvitationData } from "../components/invitation-view";
import useAccepteInvitation from "@/app/api/project/accepte-invitation";

interface IProps {
  params: { invitation_token: string };
}

export default function InvitePage({ params }: IProps) {
  const { invitation_token } = params;
  const [data, setData] = useState<InvitationData | null>(null);
  const {data:invitation_data,error:invitation_error,trigger} = useAccepteInvitation({invitation_token});
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
  }, [invitation_token]);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return <InvitationView data={data} onJoin={()=>{trigger()}}/>;
}
