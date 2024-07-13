"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import { Button } from "@/components/ui/button";
import LightDarkToggle from "@/components/ui/light-dark-toggle";
import Link from "next/link";
import ProjectsSelect from "../projects/components/projects-select";
import ProjectMenu from "../projects/components/project-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { error } from "console";
import { Separator } from "@/components/ui/separator";
import useMenuTabStore from "@/store/menuTabStore";
import { useEffect } from "react";
import { useMyProjects } from "@/app/api/project/get-my-projects";
import { Project } from "@/types/projects";
import { useProject } from "@/app/api/project/get-project";
import { useUserInfo } from "@/app/api/useUserInfo";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ClearUserInfo } from "@/lib/clear-user-info";

export default function MainMenu() {
  const userId = useUserStore(state => state.userId);
  const { data: user_data, error: user_error } = useUserInfo({ userId });

  const url = `/api/auth/logout`;
  const fetcher = (url: string) => {
    fetch(url, {
      method: "POST",
      credentials: "include",
    }).then(res => {
      if (!res.ok) {
        throw new Error("Error! status:" + res.status);
      }
      return res;
    });
  };
  const { error, trigger } = useSWRMutation(`${BASE_URL}${url}`, fetcher);
  const logOut = async () => {
    await trigger();
    ClearUserInfo();
    if (error) alert(error);
  };

  const tabValue = useMenuTabStore(s => s.value);
  const setTabValue = useMenuTabStore(s => s.setValue);
  function handleTabValueChange(newValue: string) {
    setTabValue(newValue as "person" | "project");
  }
  const { mutateMyProjects } = useMyProjects();
  useEffect(() => {
    mutateMyProjects();
  }, []);

  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col">
      <header className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 flex flex-col gap-1 grow">
        <Tabs
          defaultValue="person"
          value={tabValue}
          onValueChange={handleTabValueChange}
        >
          <TabsList className="">
            <TabsTrigger value="person">个人空间</TabsTrigger>
            <TabsTrigger value="project">项目空间</TabsTrigger>
          </TabsList>
          <TabsContent value="person">
            <MenuItem href="/projects">项目列表</MenuItem>
            <Separator className="my-2" />
            <MenuItem href="/dashboard">仪表盘</MenuItem>
            <MenuItem href="/agenda">日程</MenuItem>
            <MenuItem href="/tasks">任务</MenuItem>
            <MenuItem href="/draft">草稿</MenuItem>
            <Separator className="my-2" />
            <MenuItem href="/inbox">收件箱</MenuItem>
            <MenuItem href="/profile">个人资料</MenuItem>
          </TabsContent>
          <TabsContent value="project">
            <ProjectMenu />
          </TabsContent>
        </Tabs>
      </ul>
      <footer className="flex gap-2 items-center">
        <Avatar>
          {user_data.avatar && (
            <AvatarImage src={user_data.avatar}></AvatarImage>
          )}
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800 select-none">
            {(user_data.username as string).substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <Button variant={"outline"} asChild>
          <Link href="/" onClick={logOut}>
            登出
          </Link>
        </Button>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
