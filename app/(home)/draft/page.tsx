import { Label } from "@/components/ui/label";
import { DraftsTable } from "../components/draftsTable";
import { Button } from "@/components/ui/button";

export default function DraftPage() {
  return <div>
    <div className="flex justify-between">
      <Label className="font-bold text-xl">草稿总览</Label>
      <Button>新增草稿</Button>
    </div>
      <DraftsTable ></DraftsTable>
  </div>

}
