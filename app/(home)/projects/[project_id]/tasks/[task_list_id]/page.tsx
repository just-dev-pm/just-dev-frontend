"use client";

import { TasksBoardView } from "@/app/(home)/tasks/components/taskDialog";
import { TasksTable } from "@/app/(home)/tasks/components/tasksTable";
import useTaskList from "@/app/api/useTaskList";
import Loading from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IProps {
  params: {
    project_id: string;
    task_list_id: string;
  };
}
export default function TaskListPage({ params }: IProps) {
  const { project_id, task_list_id } = params;
  const { data, error, isLoading } = useTaskList({ task_list_id });
  const list_name = data.name;

  if (isLoading) return <Loading />;

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
            project={{
              isProject: true,
              projectId: project_id,
            }}
          ></TasksBoardView>
        </TabsContent>
        <TabsContent value="list">
          <TasksTable task_list_id={task_list_id} data={data}></TasksTable>
        </TabsContent>
      </Tabs>
    </div>
  );
}
