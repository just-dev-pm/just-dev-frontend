"use client";

import { Label } from "@/components/ui/label";
import { DraftsTable } from "./components/draftsTable";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import { BASE_URL } from "@/lib/global";
import DraftsView from "./components/draftsView";
import useUserDrafts from "@/app/api/Draft/get-user-drafts";
import { DraftsDialog } from "./components/draftsDialog";

export default function DraftPage() {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error } = useUserDrafts({ user_id: userId });
  const hostUrl = "ws://localhost:1234/ws/";
  const drafts = data.drafts;
  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <DraftsDialog
          project={{
            isProject: false,
            project_id: "",
          }}
        >
          新增草稿
        </DraftsDialog>
      </div>
      <DraftsView drafts={drafts}></DraftsView>
    </div>
  );
}
