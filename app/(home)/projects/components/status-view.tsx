import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Incomplete, StatusItem } from "@/types/project";
import { Badge, BadgeProps } from "@/components/ui/badge";

interface ICompleteStatusView {
  status: StatusItem;
}
export function CompleteStatusView({ status }: ICompleteStatusView) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge className="bg-green-600  hover:bg-green-400 hover:cursor-default">
            {status.name}
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <Badge className="bg-green-600  hover:bg-green-400 hover:cursor-default">
            {status.name}
          </Badge>
          <div className="p-4">{status.description}</div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

interface IInCompleteStatusView extends BadgeProps {
  c: Incomplete;
}
export function InCompleteStatusView({ c, ...props }: IInCompleteStatusView) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge
            className=" hover:cursor-default hover:text-gray-300"
            variant={"secondary"}
            {...props}
          >
            {c.status.name}
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <Badge
            className=" hover:cursor-default hover:text-gray-300"
            variant={"secondary"}
          >
            {c.status.name}
          </Badge>
          <div className="p-4">{c.status.description}</div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
