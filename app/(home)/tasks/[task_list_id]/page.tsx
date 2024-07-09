"use client"

import { TaskDialog } from "@/app/(home)/components/taskDialogList"
import { DataTableDemo } from "@/app/(home)/components/tasksTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface IProps {
  params: { task_list_id: string };
}
export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  return <div>
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
  </div>;
}

