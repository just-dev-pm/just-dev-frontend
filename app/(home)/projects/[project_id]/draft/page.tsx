import { DraftsTable } from "@/app/(home)/components/draftsTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DraftPage() {
  return <div>
      <div className="flex justify-between">
        <Label className="font-bold text-xl">草稿总览</Label>
        <Button>新增草稿</Button>
      </div>
      <DraftsTable></DraftsTable>
  </div>

}
