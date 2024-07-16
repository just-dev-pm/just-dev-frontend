"use client";

import { TasksBoardView } from "../components/taskDialog";
import { TasksTable } from "../components/tasksTable";
import useTaskList from "@/app/api/useTaskList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL } from "@/lib/global";
import Link from "next/link";
import useSWR from "swr";
import TaskDialog from "../components/taskDialogButton";
import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import Loading from "@/components/ui/loading";

interface IProps {
  params: { task_list_id: string };
}

export type Task = {
  id: string;
  list_id: string;
  name: string;
  description: string;
  status: "complete" | "incomplete";
  deadline: string;
  assignees: string[];
};


export default function TaskListPage({ params }: IProps) {
  const { task_list_id } = params;
  const { data:tasklist_data, error:tasklist_error } = useTaskList({ task_list_id });
  const {data,error} = useTasksFromTaskList({task_list_id})
  const dialog_data: Task[] = data.tasks;
  if(!dialog_data) return <Loading />

  return error ? (
    <div>{error}</div>
  ) : (
    <div className="max-h-screen">
      <Tabs defaultValue="board">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="board">看板</TabsTrigger>
            <TabsTrigger value="list">列表</TabsTrigger>
          </TabsList>
          <TaskDialog
            message={""}
            members={[]}
            project={{
              isProject: false,
              projectId: "",
            }}
          ></TaskDialog>
        </div>
        <TabsContent value="board">
          <TasksBoardView
            project={{ isProject: false, projectId: "" }}
            task_list_id={task_list_id}
            list_name={""}
          ></TasksBoardView>
        </TabsContent>
        <TabsContent value="list">
          <TasksTable task_list_id={task_list_id} data={dialog_data}></TasksTable>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button>
          <Link href={`./`}>返回</Link>
        </Button>
      </div>
    </div>
  );
}
