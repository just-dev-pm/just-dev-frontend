"use client";

import useTasksFromTaskList from "@/app/api/task/get-tasks-from-tasklist";
import useTaskList from "@/app/api/useTaskList";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { TasksBoardView } from "../components/taskDialog";
import TaskDialog from "../components/taskDialogButton";
import { TasksTable } from "../components/tasksTable";

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
  const { data: tasklist_data, error: tasklist_error } = useTaskList({
    task_list_id,
  });
  const { data, error } = useTasksFromTaskList({ task_list_id });
  const dialog_data: Task[] = data.tasks;
  if (!dialog_data) return <Loading />;

  return error ? (
    <div>{error}</div>
  ) : (
    <div className="h-screen flex flex-col gap-4">
      <Tabs defaultValue="board">
        <div className="flex gap-4">
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
            task_list_id={task_list_id}
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
          <TasksTable
            task_list_id={task_list_id}
            data={dialog_data}
          ></TasksTable>
        </TabsContent>
      </Tabs>
      <div>
        <Button asChild className="mt-16">
          <Link href={`./`}>返回</Link>
        </Button>
      </div>
    </div>
  );
}
