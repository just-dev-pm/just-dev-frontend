import { useUserStore } from "@/store/userStore";

export function ClearUserInfo() {
  document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  useUserStore.persist.clearStorage();
}
