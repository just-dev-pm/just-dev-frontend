"use client";

import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import DraftsView from "./components/draftsView";
import useUserDrafts from "@/app/api/draft/get-user-drafts";
import { DraftsDialog } from "./components/draftsDialog";
import Loading from "@/components/ui/loading";

export default function DraftPage() {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error, isLoading } = useUserDrafts({ user_id: userId });
  if (isLoading) return <Loading />;
  if ((data?.drafts as any[]).length < 1)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">
          你还没有草稿, 点击{" "}
          <DraftsDialog
            project={{
              isProject: false,
              project_id: "",
            }} variant="default"         >
            新增草稿
          </DraftsDialog>
          新建一个草稿吧
        </h3>
      </div>
    );
  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="flex justify-between">
        <h2>草稿总览</h2>
        <DraftsDialog
          project={{
            isProject: false,
            project_id: "",
          }}
          variant="default"
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
