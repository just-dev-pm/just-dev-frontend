"use client"

import { TaskDialog } from "@/app/(home)/components/taskDialogList"
import { DataTableDemo } from "@/app/(home)/components/tasksTable"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";



interface IProps {
  params: { task_list_id: string };
}
export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  return <div className="max-h-screen">
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board">看板</TabsTrigger>
        <TabsTrigger value="list">列表</TabsTrigger>
      </TabsList>
      <TabsContent value="board">
        <TaskDialog></TaskDialog>
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

