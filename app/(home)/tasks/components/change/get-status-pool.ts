import { useProfile } from "@/app/api/user/get-profile";
import { ExtractStatus } from "../change-status/extract-status-pool";

export function useGetUserStatusPool() {
  const { profile } = useProfile();
  const statusPool = profile.status_pool;
  const options = ExtractStatus(statusPool);
  return { options };
}
