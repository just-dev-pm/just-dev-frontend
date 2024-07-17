import { TaskRelation } from "@/types/task-link/get";
import React from "react";
import { Divider, Tag } from "rsuite";

// Define your interface definitions here

interface TaskRelationViewProps {
  taskLinks: TaskRelation[];
  taskId: string; // Assuming you pass the current task ID as a prop
}

const View: React.FC<TaskRelationViewProps> = ({ taskLinks, taskId }) => {
  // Filter links for predecessors (to === taskId) and successors (from === taskId)
  const predecessors = taskLinks.filter(link => link.to.id === taskId);
  const successors = taskLinks.filter(link => link.from.id === taskId);

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
              <div>ID: {link.from.id}</div>
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
              <div>ID: {link.to.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { View as TaskRelationView };
