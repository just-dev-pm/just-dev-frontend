"use client"

import { TaskDialog } from "@/app/(home)/components/taskDialogList"
import { DataTableDemo } from "@/app/(home)/components/tasksTable"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BASE_URL } from "@/lib/global";
import Link from "next/link";
import useSWR from "swr";



interface IProps {
  params: { task_list_id: string };
}
export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  const url = `/api/task_lists/`;
  const { data , error } = useSWR(
    task_list_id ? [url,task_list_id]:null,
    ([url,task_list_id]) =>
      fetch(BASE_URL + url + task_list_id,{
        credentials:"include",
      }).then((res)=>{
        if(!res.ok){
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
      {suspense:true,fallbackData:{tasks:[]}}
  )
  const list_name = data.name;

  return <div className="max-h-screen">
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">看板</TabsTrigger>
        <TabsTrigger value="list">列表</TabsTrigger>
      </TabsList>
      <TabsContent value="board">
        <TaskDialog task_list_id={task_list_id} list_name={list_name} ></TaskDialog>
      </TabsContent>
      <TabsContent value="list">
        <DataTableDemo></DataTableDemo>
      </TabsContent>
    </Tabs>
    <div className="flex justify-end">
      <Button><Link href={`./`}>返回</Link></Button>
    </div>
  </div>;
}

