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

  console.log(
"sldjfsd", task
  )

  if (isLoading || !task)
    return (
      <Placeholder.Paragraph rows={1} rowSpacing={0} rowHeight={15} active />
    );

  return <TaskItem task={task} />;
}

export { Control as TaskControl };
