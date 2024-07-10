import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "./edit-profile";

export interface IUserData {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}
export const ProfileView = ({ userData }: { userData: IUserData }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full bg-white shadow-md rounded-lg">
        <CardHeader>
          <div className="flex">
            <Avatar>
              <AvatarImage src={userData?.avatar} />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <EditProfile className="ml-auto" />
          </div>
          <CardTitle>{userData.username}</CardTitle>
          <CardDescription>User ID: {userData.id}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p className="text-center">{userData?.email}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
