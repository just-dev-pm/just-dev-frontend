import useTaskChange from "@/app/api/task/change-task";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import { mutate } from "swr";
import { ChangeStatusContextProvider } from "./change-status/context";
import { StatusContextProvider } from "./change-status/get-status";
import { Task } from "./change-status/task";
import TaskItem from "./change-status/task-item";
import TaskDialog from "./taskDialogButton";

type Props = {
  task_list_id: string;
  todoListIcon: JSX.Element;
  tasks: Task[];
  dialogMessage: string;
  dialogMembers: { id: string }[];
  project: { isProject: boolean; projectId: string };
};

function TasksList({
  task_list_id,
  todoListIcon,
  tasks,
  dialogMessage,
  dialogMembers,
  project,
}: Props) {
  const path = usePathname();
  const { trigger } = useTaskChange({ task_list_id });
  const handleTaskChange = async (res: any, task_id: string) => {
    await trigger({ res, task_id });
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
  };
  return (
    <Card className="min-w-[25vw] min-h-[20vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <Label className="font-bold text-xl">{todoListIcon}</Label>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-col">
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
          task_list_id={task_list_id}
        ></TaskDialog>
      </CardFooter>
    </Card>
  );
}

export default TasksList;
