import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserInfo from "@/app/apiTyped/user/useUserInfo";
import Loading from "@/components/ui/loading";

interface ParticipantAvatarProps {
  participantId: string; // 参与者ID
}

const ParticipantAvatar: React.FC<ParticipantAvatarProps> = ({
  participantId,
}) => {
  const { data: participantInfo, error,isLoading } = useUserInfo(participantId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!participantInfo || isLoading) {
    return <Loading />
  }

  if(participantInfo.avatar && participantInfo.username){
    return (
      <Avatar>
        <AvatarImage src={participantInfo.avatar} alt={participantInfo.username} />
        <AvatarFallback>{participantInfo.username}</AvatarFallback>
      </Avatar>
    );
  }
};

export default ParticipantAvatar;
