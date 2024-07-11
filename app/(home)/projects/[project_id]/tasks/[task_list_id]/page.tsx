"use client";

import { TasksBoardView } from "@/app/(home)/tasks/components/taskDialog";
import { DataTableDemo } from "@/app/(home)/components/tasksTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTaskList from "@/app/api/useTaskList";

interface IProps {
  params: { task_list_id: string };
}
export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  const { data, error } = useTaskList({ task_list_id });
  const list_name = data.name;
  return (
    <div>
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">看板</TabsTrigger>
          <TabsTrigger value="list">列表</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <TasksBoardView
            task_list_id={task_list_id}
            list_name={list_name}
          ></TasksBoardView>
        </TabsContent>
        <TabsContent value="list">
          <DataTableDemo task_list_id={task_list_id}></DataTableDemo>
        </TabsContent>
      </Tabs>
    </div>
  );
}
