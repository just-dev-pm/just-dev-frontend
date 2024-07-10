"use client";

import { Label } from "@/components/ui/label";
import { DraftsTable } from "../components/draftsTable";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import { BASE_URL } from "@/lib/global";
import DraftsView from "../components/draftsView";

export default function DraftPage() {
  const userId = useUserStore((stats) => stats.userId);
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/drafts`;
  const { data, error } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, userId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { drafts: [] } }
  );
  const drafts = data.drafts;
  return (
    <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <Button>新增草稿</Button>
      </div>
      <DraftsView drafts={drafts}></DraftsView>
    </div>
  );
}
