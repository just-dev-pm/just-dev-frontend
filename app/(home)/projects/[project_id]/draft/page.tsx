'use client'

import DraftsView from "@/app/(home)/draft/components/draftsView";
import useProjectDrafts from "@/app/api/Draft/get-project-drafts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";

type IProps = {
  params:{project_id:string}
}

export default function DraftPage({params}:IProps) {
  const {project_id} = params
  // console.log(project_id);
  const {data,error} = useProjectDrafts({project_id})
  const drafts = data.drafts
  return <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <Button>新增草稿</Button>
      </div>
      <DraftsView drafts={drafts}></DraftsView>
  </div>

}
