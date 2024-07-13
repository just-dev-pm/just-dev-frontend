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
import { User } from "@/types/user";
import UserAvatar from "./user-avatar";
import UserId from "./user-id";

export const ProfileView = ({ userData }: { userData: User }) => {
  return (
    <Card className="w-[50%] h-[50%] shadow-md rounded-lg">
      <CardHeader>
        <div className="flex justify-center items-center">
          <div className="flex gap-2 items-center">
            <UserAvatar avatar={userData?.avatar} className="w-12 h-12" />
            <div className="flex flex-col gap-1">
              <div>{userData?.username || ""}</div>
              <div>
                ID: <UserId id={userData?.id} />
              </div>
            </div>
          </div>
          <EditProfileController className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent>邮箱: {userData?.email}</CardContent>
    </Card>
  );
};
