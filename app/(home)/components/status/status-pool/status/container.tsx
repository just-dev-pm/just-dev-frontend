import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tag } from "rsuite";
import { StatusView, StatusViewProps } from "./view";

type ContainerProps = StatusViewProps;
function Wrapper({ status, ...props }: ContainerProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <StatusView status={status} {...props} />
      </HoverCardTrigger>
      <HoverCardContent className="w-80 gap-4">
        <Tag {...props}>{status.name}</Tag>
        <p className="mt-4">
          <span className="text-primary h-[2em] underline">描述: </span>
          {status.description}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

export { Wrapper as StatusContainer };
