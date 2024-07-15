"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notification } from "@/types/notification";
import useNotifications from "@/app/api/notification/get-notifications";
import { useUserStore } from "@/store/userStore";
import Read from "./components/read";
import From from "./components/from";
import { useMarkNotifications } from "@/app/api/notification/mark-as-read";
import Loading from "@/components/ui/loading";

export default function InboxPage() {
  const userId = useUserStore(state => state.userId);
  const { data, mutate, isLoading } = useNotifications({ user_id: userId });
  const { trigger } = useMarkNotifications();

  const notifications: Notification[] = data.notifications;
  const markAsRead = (nid: string) => {
    const newData = {
      notifications: notifications.map(notification => {
        return notification.id === nid
          ? {
              ...notification,
              handled: true,
            }
          : notification;
      }),
    };

    const Async = async () => {
      await trigger(nid);
      return newData;
    };

    mutate(Async, { optimisticData: newData });
  };

  if (isLoading) return <Loading />;
  if (data?.notifications.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">收件箱中暂无消息</h3>
      </div>
    );

  return (
    <NotificationView notifications={notifications} markAsRead={markAsRead} />
  );
}

interface INotificationView {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

function NotificationView({ notifications, markAsRead }: INotificationView) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">所有通知</h1>
      <div>
        {notifications.map(notification => (
          <Card key={notification.id} className="m-2">
            <CardHeader>
              <div className="flex gap-2">
                <div className="grow">
                  <CardTitle
                    className={`${
                      notification.handled ? "text-gray-400" : "text-black"
                    }`}
                  >
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    <From notification={notification} /> | 通知ID:{" "}
                    {notification.id}
                  </CardDescription>
                </div>
                <Read notification={notification} markAsRead={markAsRead} />
              </div>
            </CardHeader>
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
