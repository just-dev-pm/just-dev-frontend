import { Badge } from "@/components/ui/badge";
import { Status } from "../project/types";

interface ItemProps {
  status: Status;
}
function Item({ status }: ItemProps) {
  if (status.category === "complete")
    return <Badge className="bg-green-500">已完成</Badge>;
  return <Badge>未完成</Badge>;
}

export { Item as StatusItem };
