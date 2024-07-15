"use client";

import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import DraftsView from "./components/draftsView";
import useUserDrafts from "@/app/api/draft/get-user-drafts";
import { DraftsDialog } from "./components/draftsDialog";
import Loading from "@/components/ui/loading";

export default function DraftPage() {
  const userId = useUserStore(stats => stats.userId);
  const { data, error } = useUserDrafts({ user_id: userId });
  if ((data?.drafts as any[]).length < 1) return <Loading />;
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
      <div className="grid grid-cols-3 gap-4 relative mt-4">
        <DraftsView drafts={data.drafts}></DraftsView>
      </div>
    </div>
  );
}
