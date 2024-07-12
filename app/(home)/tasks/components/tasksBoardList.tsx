import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoStyleInput } from "../../components/noStyleInput";
import { X } from "lucide-react";
import TaskDialog from "./taskDialogButton";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  todoListName: string;
  tasks: { id: string; name: string }[];
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
      <Card className="w-[350px]">
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
          {tasks.map((task) => (
            <div className="flex items-center justify-between" key={task.id}>
              <Switch></Switch>
              <Button
                className="text-black bg-gray-50 w-full hover:bg-gray-50"
                asChild
              >
                <Link href={`${path}/${task.id}`}>{task.name}</Link>
              </Button>
            </div>
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
