import { useUserInfo } from "@/app/api/useUserInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TasksTableAvatar({c_user_id}:{c_user_id:string}){
    const { data, error } = useUserInfo({ userId: c_user_id });
    const avatar = data.avatar;
    return (
      <Avatar key={c_user_id}>
        <AvatarImage src={avatar}></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
}