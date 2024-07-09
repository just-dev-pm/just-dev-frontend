import { RequirementsTable } from "@/app/(home)/components/requirementsTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RequirementsPage() {
  return <div>
    <div className="flex justify-between">
      <Label className="text-xl font-bold">需求总览</Label>
      <Button>新增需求</Button>
    </div>

    <RequirementsTable></RequirementsTable>
  </div>

}
