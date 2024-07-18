"use client";

import { Badge } from "rsuite";
import { useNotificationsContext } from "../../inbox/components/context";
import MenuItem from "../menu-item";

function Item() {
  const { unreadCount, isLoading } = useNotificationsContext();

  return (
    <Badge
      content={isLoading || unreadCount < 1 ? false : unreadCount}
      className="block"
    >
      <MenuItem href="/inbox">收件箱</MenuItem>
    </Badge>
  );
}

export { Item as NotificationMenuItem };
