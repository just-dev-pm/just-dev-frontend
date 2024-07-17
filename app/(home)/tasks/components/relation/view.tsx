import { TaskRelation } from "@/types/task-link/get";
import React from "react";
import { Divider, Tag } from "rsuite";
import { ChangeRelationControl } from "../change-relation/control";
import { DeleteRelationTrigger } from "../delete-relation/trigger";

// Define your interface definitions here

interface TaskRelationViewProps {
  taskLinks: TaskRelation[];
  taskId: string; // Assuming you pass the current task ID as a prop
}

const View: React.FC<TaskRelationViewProps> = ({ taskLinks, taskId }) => {
  // Filter links for predecessors (to === taskId) and successors (from === taskId)
  const predecessors = taskLinks.filter((link) => link.to.id === taskId);
  const successors = taskLinks.filter((link) => link.from.id === taskId);

  return (
    <div className="space-y-4">
      {predecessors.length > 0 && (
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-bold">Predecessors:</h2>
          {predecessors.map((link, index) => (
            <div key={link.id} className="mt-2 flex gap-4 items-center">
              <div className="w-8">
                <Tag color="blue">{link.category}</Tag>
              </div>
              <Divider vertical />
              <div className="grow">ID: {link.from.id}</div>
              <ChangeRelationControl linkId={link.id} />
              <DeleteRelationTrigger linkId={link.id} />
            </div>
          ))}
        </div>
      )}

      {successors.length > 0 && (
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-bold">Successors:</h2>
          {successors.map((link, index) => (
            <div key={link.id} className="mt-2 flex gap-4 items-center">
              <div className="w-8">
                <Tag color="blue">{link.category}</Tag>
              </div>
              <Divider vertical />
              <div className="grow">ID: {link.to.id}</div>

              <ChangeRelationControl linkId={link.id} />
              <DeleteRelationTrigger linkId={link.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { View as TaskRelationView };
