import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/types/tasks";
import Link from "next/link";

export default function TaskListOverrall({
  taskLists,
}: {
  taskLists: TaskList[];
}) {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <h1 className="text-3xl font-bold my-4">任务列表</h1>
        <Button className="ml-auto">新建列表</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {taskLists.map(taskList => (
          <Link href={`./tasks/${taskList.id}`} key={taskList.id}>
            <div
              key={taskList.id}
              className="p-4 border border-gray-200 rounded"
            >
              <div className="flex m-2">
                <h2 className="text-xl font-semibold mb-2">{taskList.name}</h2>
                <Button className="ml-auto">查看</Button>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
                <StatisticsView name="任务数" count={taskList.tasks.length} />
                {/* <StatisticsView
                  name="被分配者数"
                  count={countAssignees(taskList)}
                /> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const countAssignees = (taskList: TaskList) => {
  let assigneeCount = 0;
  taskList.tasks.forEach(task => {
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
