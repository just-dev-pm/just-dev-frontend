import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditProfileController from "./edit-profile-controller";
import { Incomplete, User } from "@/types/user";
import UserAvatar from "./user-avatar";
import UserId from "./user-id";
import {
  CompleteStatusView,
  InCompleteStatusView,
} from "../../projects/components/status-view";

export const ProfileView = ({ userData }: { userData: User }) => {
  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="flex gap-4 items-center mr-8">
            <UserAvatar avatar={userData?.avatar} className="w-12 h-12" />
            <div className="flex flex-col gap-2">
              <div>{userData?.username || ""}</div>
              <div>
                ID: <UserId id={userData?.id} />
              </div>
            </div>
          </div>
          <EditProfileController className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent>邮箱: {userData?.email || "未设置"}</CardContent>
      {userData.status_pool && userData.status_pool.complete.name && (
        <CardContent>
          <div className="flex gap-2">
            <span className="truncate">状态池</span>
            <CompleteStatusView status={userData.status_pool.complete} />

            {userData.status_pool.incomplete.map((task: Incomplete) => (
              <InCompleteStatusView c={task} key={task.id} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
