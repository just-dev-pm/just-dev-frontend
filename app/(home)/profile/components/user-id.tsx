import { useToast } from "@/components/ui/use-toast";
import { ReactElement, ReactHTMLElement } from "react";

type IUserId = string;
interface UserIdProps extends React.HTMLAttributes<HTMLSpanElement> {
  id?: IUserId;
}

export default function UserId(props: UserIdProps) {
  const { toast } = useToast();
  return (
    <span
      className="hover:decoration-dashed hover:underline"
      title="点击复制"
      onClick={() => {
        if (props.id) {
          navigator.clipboard.writeText(props.id);
          toast({
            title: "复制成功!",
            description: props.id,
          });
        }
      }}
    >
      {props.id || ""}
    </span>
  );
}
