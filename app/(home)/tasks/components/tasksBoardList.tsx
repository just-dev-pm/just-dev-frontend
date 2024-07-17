import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NoStyleInput } from "../../components/noStyleInput";
import { ChangeStatusContextProvider } from "./change-status/context";
import { StatusContextProvider } from "./change-status/get-status";
import { Task } from "./change-status/task";
import TaskItem from "./change-status/task-item";
import TaskDialog from "./taskDialogButton";
import useTaskChange from "@/app/api/task/change-task";
import { mutate } from "swr";
import { Label } from "@/components/ui/label";

type Props = {
  task_list_id: string;
  todoListName: string;
  tasks: Task[];
  dialogMessage: string;
  dialogMembers: { id: string }[];
  project: { isProject: boolean; projectId: string };
};

function TasksList({
  task_list_id,
  todoListName,
  tasks,
  dialogMessage,
  dialogMembers,
  project,
}: Props) {
  const path = usePathname();
  const [isShow, setShow] = React.useState(true);
  const handleShowChange = () => {
    setShow(!isShow);
  };
  const { trigger } = useTaskChange({ task_list_id });
  const handleTaskChange = async (res: any, task_id: string) => {
    await trigger({ res, task_id });
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
  };
  return (
    isShow && (
      <Card className="w-[20%] min-h-[20vh] flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Label className="font-bold text-xl">{todoListName}</Label>

            <Button
              onClick={handleShowChange}
              className="bg-white text-black hover:bg-white"
            >
              <X className="h-full"></X>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <ChangeStatusContextProvider
              initialData={task}
              key={index}
              handleTaskChange={handleTaskChange}
              task_id={task.id}
            >
              <StatusContextProvider projectId={project.projectId}>
                <TaskItem task={task} index={index + 1} />
              </StatusContextProvider>
            </ChangeStatusContextProvider>
          ))}
        </CardContent>
        <CardFooter className="mt-auto">
          <TaskDialog
            project={project}
            message={dialogMessage}
            members={dialogMembers}
          ></TaskDialog>
        </CardFooter>
      </Card>
    )
  );
}

export default TasksList;
