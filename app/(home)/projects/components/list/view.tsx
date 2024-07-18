// View.tsx

import {
  Response,
  Task,
  TaskList,
} from "@/app/(home)/tasks/components/list/types";
import { Button } from "@/components/ui/button";
import { ListIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Divider } from "rsuite";
import { TaskControl } from "./item/control";

interface Props {
  data: Response;
  handleDelete: (id: string) => void;
}

const View: React.FC<Props> = ({ data, handleDelete }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.task_lists.map((taskList: TaskList) => (
        <div key={taskList.id} className="p-4 border rounded">
          <div className="flex pr-2 gap-4 items-center">
            <ListIcon />
            <Link
              href={`./tasks/${taskList.id}`}
              className="grow flex items-center"
            >
              <h2 className="text-xl font-bold">{taskList.name}</h2>
            </Link>
            <Button variant="ghost" onClick={() => handleDelete(taskList.id)}>
              <Trash2 size={20} />
            </Button>
          </div>
          <Divider />
          <ul>
            {taskList.tasks.slice(0, 3).map((task: Task) => (
              <li key={task.id} className="my-2">
                <TaskControl taskId={task.id} />
              </li>
            ))}
            {taskList.tasks.length > 3 && (
              <li className="mt-2">
                <Link href={`./tasks/${taskList.id}`}>
                  <button className="text-blue-600 hover:underline">
                    查看更多 (+{taskList.tasks.length - 3})
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { View as TaskListView };
