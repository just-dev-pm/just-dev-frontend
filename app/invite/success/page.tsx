"use client";
import { useEffect, useState } from "react";
import JoinSuccessView, { JoinSuccessData } from "../components/join-success";

export default function InvitePage() {
  const [data, setData] = useState<JoinSuccessData | null>(null);

  useEffect(() => {
    async function fetchInvitation() {
      // const res = await fetch(`/api/invitation/${invitation_id}`);
      // const result = await res.json();
      const result: JoinSuccessData = {
        member: "Dawn Chan",
        project: "Just Dev",
      };
      setData(result);
    }
    fetchInvitation();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return <JoinSuccessView data={data} />;
}
