import { TaskRelation } from "@/types/task-link/get";
import React from "react";
import { Divider, Tag } from "rsuite";
import { mutate } from "swr";
import { ChangeRelationControl } from "../change-relation/control";
import { useSWRDeleteRelation } from "../delete-relation/swr";
import { DeleteRelationTrigger } from "../delete-relation/trigger";
import { TaskControl } from "../list/item/control";

// Define your interface definitions here

interface TaskRelationViewProps {
  taskLinks: TaskRelation[];
  taskId: string; // Assuming you pass the current task ID as a prop
}

const View: React.FC<TaskRelationViewProps> = ({ taskLinks, taskId }) => {
  // Filter links for predecessors (to === taskId) and successors (from === taskId)

  const predecessors = taskLinks.filter((link) => link.to.id === taskId);
  const successors = taskLinks.filter((link) => link.from.id === taskId);
  const { trigger } = useSWRDeleteRelation();

  const mutatePredecessorsDelete = (linkId: string) => {
    const newData = predecessors.filter(
      (predecessor) => predecessor.id !== linkId,
    );
    mutate(
      ["/api/links/tasks/", taskId],
      async () => {
        await trigger(linkId);
        return newData;
      },
      { optimisticData: newData },
    );
  };
  const mutateSuccessorsDelete = (linkId: string) => {
    const newData = successors.filter((successor) => successor.id !== linkId);
    mutate(
      ["/api/links/tasks/", taskId],
      async () => {
        await trigger(linkId);
        return newData;
      },
      { optimisticData: newData },
    );
  };

  return (
    <div className="space-y-4">
      {predecessors.length > 0 && (
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-bold">前置任务:</h2>
          {predecessors.map((link, index) => (
            <div key={link.id} className="mt-2 flex gap-4 items-center">
              <div className="w-8">
                <Tag color={link.category === "auto" ? "yellow" : "blue"}>
                  {link.category}
                </Tag>
              </div>
              <Divider vertical />
              <div className="grow">
                <TaskControl taskId={link.from.id} />
              </div>
              <ChangeRelationControl linkId={link.id} taskId={taskId} />
              <DeleteRelationTrigger
                linkId={link.id}
                mutateDelete={mutatePredecessorsDelete}
              />
            </div>
          ))}
        </div>
      )}

      {successors.length > 0 && (
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-bold">后置任务:</h2>
          {successors.map((link, index) => (
            <div key={link.id} className="mt-2 flex gap-4 items-center">
              <div className="w-8">
                <Tag color={link.category === "auto" ? "yellow" : "blue"}>
                  {link.category}
                </Tag>
              </div>
              <Divider vertical />
              <div className="grow">
                <TaskControl taskId={link.to.id} />
              </div>

              <ChangeRelationControl linkId={link.id} taskId={taskId} />
              <DeleteRelationTrigger
                linkId={link.id}
                mutateDelete={mutateSuccessorsDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { View as TaskRelationView };
