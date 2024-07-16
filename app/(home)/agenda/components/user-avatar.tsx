import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserInfo } from "@/app/api/useUserInfo";
import Loading from "@/components/ui/loading";

interface ParticipantAvatarProps {
  participantId: string; // 参与者ID
}

const ParticipantAvatar: React.FC<ParticipantAvatarProps> = ({
  participantId,
}) => {
  const { data: participantInfo, error,isLoading } = useUserInfo({
    userId: participantId,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!participantInfo || isLoading) {
    return <Loading />
  }

  return (
    <Avatar>
      <AvatarImage src={participantInfo.avatar} alt={participantInfo.name} />
      <AvatarFallback>{participantInfo.name}</AvatarFallback>
    </Avatar>
  );
};

export default ParticipantAvatar;
