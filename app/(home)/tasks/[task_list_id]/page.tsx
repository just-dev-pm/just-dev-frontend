"use client";

import { TasksBoardView } from "../components/taskDialog";
import { TasksTable } from "../components/tasksTable";
import useTaskList from "@/app/api/useTaskList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL } from "@/lib/global";
import Link from "next/link";
import useSWR from "swr";

interface IProps {
  params: { task_list_id: string };
}
export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  const { data, error } = useTaskList({ task_list_id });
  const list_name = data.name;

  return error ? <div>{error}</div> :
    <div className="max-h-screen">
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">看板</TabsTrigger>
          <TabsTrigger value="list">列表</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <TasksBoardView
            project={{isProject:false,projectId:"-1"}}
            task_list_id={task_list_id}
            list_name={list_name}
          ></TasksBoardView>
        </TabsContent>
        <TabsContent value="list">
          <TasksTable task_list_id={task_list_id}></TasksTable>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button>
          <Link href={`./`}>返回</Link>
        </Button>
      </div>
    </div>
  
}
