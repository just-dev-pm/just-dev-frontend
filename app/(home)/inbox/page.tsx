"use client";
import { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notification, Source } from "@/types/notification";
import { Button } from "@/components/ui/button";
import useNotifications from "@/app/api/notification/get-notifications";
import { useUserStore } from "@/store/userStore";

const notifications: Notification[] = [
  {
    id: "1",
    title: "任务即将截止",
    content: "您的任务即将超过截止日期.",
    handled: false,
    asset: {
      id: "123",
      source: Source.Task,
    },
  },
  {
    id: "2",
    title: "草稿被删除",
    content: "您创建的草稿被 Dawn Chan 删除.",
    handled: true,
    asset: {
      id: "456",
      source: Source.Draft,
    },
  },
  // Add more notifications as needed
];

export default function InboxPage() {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error } = useNotifications({ user_id: userId });
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const markAsRead = (id: string) => {
    setReadNotifications([...readNotifications, id]);
  };
  const notifications = data.notifications

  if (data?.notifications.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">
          收件箱中暂无消息
        </h3>
      </div>
    );

  return (
      <NotificationView
        notifications={notifications}
        readNotifications={readNotifications}
        markAsRead={markAsRead}
      />
  );
}

interface INotificationView {
  notifications: Notification[];
  readNotifications: string[];
  markAsRead: (id: string) => void;
}

type TargetSource = "草稿" | "事件" | "任务";

const sourceToTarget = (source: Source): TargetSource => {
  switch (source) {
    case Source.Draft:
      return "草稿";
    case Source.Event:
      return "事件";
    case Source.Task:
      return "任务";
    default:
      throw new Error("未知的资产类型");
  }
};

function NotificationView({
  notifications,
  readNotifications,
  markAsRead,
}: INotificationView) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">所有通知</h1>
      <div>
        {notifications.map((notification) => (
          <Card key={notification.id} className="m-2">
            <CardHeader>
              <div className="flex gap-2">
                <div className="grow">
                  <CardTitle
                    className={`${
                      readNotifications.includes(notification.id)
                        ? "text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    通知ID: {notification.id}
                  </CardDescription>
                </div>
                <Button
                  className="w-24"
                  variant={
                    readNotifications.includes(notification.id)
                      ? "outline"
                      : "default"
                  }
                  onClick={() => markAsRead(notification.id)}
                  size="sm"
                >
                  {readNotifications.includes(notification.id)
                    ? "已读"
                    : "标记已读"}
                </Button>
              </div>
            </CardHeader>
            <CardContent
              className={`${
                readNotifications.includes(notification.id)
                  ? "text-gray-400"
                  : "text-black"
              }`}
            >
              {notification.content}
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  来自 {sourceToTarget(notification.asset.source)} (ID:{" "}
                  {notification.asset.id})
                </p>
                <div className="space-x-2"></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
