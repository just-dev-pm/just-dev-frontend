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

type Props = {
  todoListName: string;
  tasks: Task[];
  dialogMessage: string;
  dialogMembers: { id: string }[];
  project: { isProject: boolean; projectId: string };
};

function TasksList({
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
  return (
    isShow && (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <NoStyleInput className="h-10" defaultValue={todoListName} />
            </div>
            <div className="flex items-center h-10">
              <Button
                onClick={handleShowChange}
                className="bg-white text-black hover:bg-white"
              >
                <X className="h-full"></X>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <ChangeStatusContextProvider initialData={task}>
              <StatusContextProvider projectId={project.projectId}>
                <TaskItem task={task} index={index + 1} />
              </StatusContextProvider>
            </ChangeStatusContextProvider>
          ))}
        </CardContent>
        <CardFooter>
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
