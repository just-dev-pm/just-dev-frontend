"use client";

import { DraftsDialog } from "@/app/(home)/draft/components/draftsDialog";
import DraftsView from "@/app/(home)/draft/components/draftsView";
import useProjectDrafts from "@/app/api/draft/get-project-drafts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";

type IProps = {
  params: { project_id: string };
};

export default function DraftPage({ params }: IProps) {
  const { project_id } = params;
  // console.log(project_id);
  const { data, error } = useProjectDrafts({ project_id });
  const drafts = data.drafts;
  return (
    <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <DraftsDialog
          project={{
            isProject: true,
            project_id,
          }}
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
