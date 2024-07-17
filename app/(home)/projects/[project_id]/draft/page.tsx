"use client";

import { DraftsDialog } from "@/app/(home)/draft/components/draftsDialog";
import DraftsView from "@/app/(home)/draft/components/draftsView";
import useProjectDrafts from "@/app/api/draft/get-project-drafts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { useUserStore } from "@/store/userStore";

type IProps = {
  params: { project_id: string };
};

export default function DraftPage({ params }: IProps) {
  const { project_id } = params;
  // console.log(project_id);
  const { data, error,isLoading } = useProjectDrafts({ project_id });
  const drafts = data.drafts;
  if (isLoading) return <Loading />;
  if ((data?.drafts as any[]).length < 1)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">
          你还没有草稿, 点击{" "}
          <DraftsDialog
            project={{
              isProject: true,
              project_id: project_id,
            }} variant="default"         >
            新增草稿
          </DraftsDialog>
          新建一个草稿吧
        </h3>
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <DraftsDialog
          project={{
            isProject: true,
            project_id,
          }}
          variant="default"
        >
          新增草稿
        </DraftsDialog>
      </div>
      <div className="grid grid-cols-3 gap-4 relative mt-4">
        <DraftsView drafts={drafts}></DraftsView>
      </div>
    </div>
  );
}
