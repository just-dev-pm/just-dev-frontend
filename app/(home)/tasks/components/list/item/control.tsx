"use client";

import { Placeholder } from "rsuite";
import { useUserTasks } from "../user/context";
import { TaskItem } from "./item";

interface ControlProps {
  taskId: string;
}
function Control({ taskId }: ControlProps) {
  const { getTaskById, isLoading } = useUserTasks();

  const task = getTaskById(taskId);

  if (isLoading || !task)
    return (
      <Placeholder.Paragraph rows={1} rowSpacing={25} rowHeight={15} active />
    );

  return <TaskItem task={task} />;
}

export { Control as TaskControl };
