import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/types/tasks";
import Link from "next/link";
import { TasklistDialog } from "./tasklistDialog";
import { Trash2 } from "lucide-react";
import useTasklistDelete from "@/app/api/tasklist/delete-tasklist";
import { mutate } from "swr";
import { useUserStore } from "@/store/userStore";
import Loading from "@/components/ui/loading";

export default function TaskListOverrall({
  taskLists,
  project,
}: {
  taskLists: TaskList[];
  project: {
    isProject: boolean;
    project_id: string;
  };
}) {
  const userId = useUserStore(stats => stats.userId);
  const {trigger} = useTasklistDelete();
  function handleTasklistDelete(task_list_id:string){
    const newData = {
      taskLists:taskLists.filter(
        ({id}:{id:string}) => id !== task_list_id
      ),
    };
    if(project.isProject){
      mutate(["/api/projects/",project.project_id,"/task_lists"],async ()=>{
        await trigger(task_list_id);
        return newData
      },{optimisticData: newData})
    }else{
      mutate(["/api/users/",userId,"/task_lists"],async ()=>{
        await trigger(task_list_id);
        return newData
      },{optimisticData: newData})
    }
  }
  if(!taskLists) return <Loading />
  return (
    <div className="container mx-auto">
      <div className="flex">
        <h2 className="my-2">任务列表</h2>
        <TasklistDialog project={project}>新增任务列表</TasklistDialog>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {taskLists.map((taskList) => (
          <div key={taskList.id} className="p-4 border border-gray-200 rounded">
            <div className="flex m-2 justify-between">
              <h2 className="text-xl font-semibold mb-2">{taskList.name}</h2>
              <div className="flex gap-4">
                <Button className="ml-auto">
                  <Link href={`./tasks/${taskList.id}`}>查看</Link>
                </Button>
                <Button variant="ghost" onClick={()=>handleTasklistDelete(taskList.id)}>
                  <Trash2 size={20} />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
              <StatisticsView name="任务数" count={taskList.tasks.length} />
              {/* <StatisticsView
                  name="被分配者数"
                  count={countAssignees(taskList)}
                /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const countAssignees = (taskList: TaskList) => {
  let assigneeCount = 0;
  taskList.tasks.forEach((task) => {
    assigneeCount += task.assignees.length;
  });
  return assigneeCount;
};

export function StatisticsView({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>{count}</h1>
      </CardContent>
    </Card>
  );
}
