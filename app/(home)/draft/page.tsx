"use client";

import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import DraftsView from "./components/draftsView";
import useUserDrafts from "@/app/api/draft/get-user-drafts";
import { DraftsDialog } from "./components/draftsDialog";

export default function DraftPage() {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error } = useUserDrafts({ user_id: userId });
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
