import { useUserInfo } from "@/app/api/useUserInfo";

export default function UserNameRender({ id }: { id: string }) {
  const { data, error } = useUserInfo({ userId: id });
  if (error)
    return <span className="inline-block text-red-500">获取用户名失败</span>;
  return <span>{data.username}</span>;
}
