"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notification } from "@/types/notification";
import { Divider } from "rsuite";
import {
  NotificationsProvider,
  useNotificationsContext,
} from "./components/context";
import From from "./components/from";
import Read from "./components/read";

export default function InboxPage() {
  return (
    <NotificationsProvider>
      <Control />
    </NotificationsProvider>
  );
}

interface INotificationView {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

function NotificationView({ notifications, markAsRead }: INotificationView) {
  return (
    <>
      <h2>所有通知</h2>
      <div>
        {notifications.map((notification) => (
          <Card key={notification.id} className="m-2">
            <CardHeader className="box-border">
              <div className="flex gap-2">
                <div className="grow">
                  <CardTitle
                    className={`${
                      notification.handled ? "text-gray-400" : "text-black"
                    }`}
                  >
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-2">
                    <From notification={notification} /> | 通知ID:{" "}
                    {notification.id}
                  </CardDescription>
                </div>
                <Read notification={notification} markAsRead={markAsRead} />
              </div>
            </CardHeader>
            <Divider className="my-2" />
            <CardContent
              className={`${
                notification.handled ? "text-gray-400" : "text-black"
              }`}
            >
              {notification.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function Control() {
  const { sortedNotifications, unreadCount, markAsRead } =
    useNotificationsContext();

  if (sortedNotifications.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">收件箱中暂无消息</h3>
      </div>
    );

  return (
    <NotificationView
      notifications={sortedNotifications}
      markAsRead={markAsRead}
    />
  );
}
