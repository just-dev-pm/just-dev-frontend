import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";

type IAvatar = string;
interface UserAvatarProps extends AvatarProps {
  avatar?: IAvatar;
}
export default function UserAvatar({ avatar, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={avatar} />
      <AvatarFallback>Dev</AvatarFallback>
    </Avatar>
  );
}
