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
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { error } from "console";
import { Separator } from "@/components/ui/separator";

export default function MainMenu() {

  const userId = useUserStore((state) => state.userId);
  const user_url = `/api/users/`;
  const { data } = useSWR(
    userId?[user_url, userId]:null,
    ([url, userId]) =>
      fetch(BASE_URL + url + userId, {
        credentials: "include"
      }).then((res) => res.json()),{suspense:true,fallbackData:{username:""}}
  );


  const url = `/api/auth/logout`;
  const fetcher = (url:string)=> {
    fetch(url,{
    method:"POST",
    credentials:"include"
}).then((res)=>{
    if(!res.ok){
        throw new Error("Error! status:"+res.status)
    }
    return res.json()
})}
  const {error,trigger} = useSWRMutation(`${BASE_URL}${url}`,fetcher);
  const logOut = ()=>{
    trigger();
    if(error) alert(error)
  }
  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col">
      <header className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 flex flex-col gap-1 grow">
        <Tabs defaultValue="person">
          <TabsList className="">
            <TabsTrigger value="person">个人空间</TabsTrigger>
            <TabsTrigger value="project">项目空间</TabsTrigger>
          </TabsList>
          <TabsContent value="person">
            <MenuItem href="/projects">项目列表</MenuItem>
            <Separator className="my-2"/>
            <MenuItem href="/dashboard">仪表盘</MenuItem>
            <MenuItem href="/agenda">日程</MenuItem>
            <MenuItem href="/tasks">任务</MenuItem>
            <MenuItem href="/draft">草稿</MenuItem>
            <Separator className="my-2"/>
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
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800 select-none">
            {data.username}
          </AvatarFallback>
        </Avatar>
        <Button variant={"outline"} asChild>
          <Link href="/" onClick={logOut}>登出</Link>
        </Button>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
