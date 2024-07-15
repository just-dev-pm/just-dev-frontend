import { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notification";

interface ReadProps extends ButtonProps {
  notification: Notification;
  markAsRead: (id: string) => void;
}
export default function Read(props: ReadProps) {
  const handled = props.notification.handled;
  const id = props.notification.id;

  const handleClick = () => {
    if (!handled) {
      props.markAsRead(id);
    }
  };
  return (
    <Button
      className="w-24"
      variant={handled ? "outline" : "default"}
      onClick={handleClick}
      size="sm"
      {...props}
    >
      {handled ? "已读" : "标记已读"}
    </Button>
  );
}
