import { Tag, TagProps } from "rsuite";
import { StatusContent } from "../../response";

interface ViewProps extends TagProps {
  status: StatusContent;
}
function View({ status, ...props }: ViewProps) {
  return (
    <Tag
      {...props}
      className="w-[6em] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
    >
      {status.name}
    </Tag>
  );
}

export { View as StatusView, type ViewProps as StatusViewProps };
