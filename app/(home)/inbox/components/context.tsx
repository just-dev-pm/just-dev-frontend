"use client";
import { useMarkNotifications } from "@/app/api/notification/mark-as-read";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { createContext, useContext } from "react";
import useSWR from "swr";

const handleResponse = (msg) => (response) => {
  if (!response.ok) {
    throw new Error(`${msg} failed`);
  }
  return response;
};

const useNotifications = () => {
  const user_id = useUserStore.getState().userId;
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/notifications`;
  const { data, error, isLoading, mutate } = useSWR(
    user_id ? [urlPrefix, user_id, urlSuffix] : null,
    ([urlPrefix, user_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + user_id + urlSuffix, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then(handleResponse("获取通知"))
        .then((res) => res.json()),
    {
      suspense: true,
      fallbackData: { notifications: [] },
      refreshInterval: 10000,
    },
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

const NotificationsContext = createContext<any | null>(null);

export const NotificationsProvider = ({ children }) => {
  const { data, mutate, isLoading } = useNotifications();
  const { trigger } = useMarkNotifications();

  const notifications: Notification[] = data.notifications;
  const markAsRead = (nid: string) => {
    const newData = {
      notifications: notifications.map((notification) => {
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

  const sortedNotifications = data.notifications.sort((a, b) => a.handled);

  const unreadCount = data.notifications.filter(
    (notification) => !notification.handled,
  ).length;

  return (
    <NotificationsContext.Provider
      value={{ sortedNotifications, unreadCount, markAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};
