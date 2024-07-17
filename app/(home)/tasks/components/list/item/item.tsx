import React from "react";
import { Task } from "../user/types"; // 确保路径和文件名正确

interface Props {
  task: Task;
}

const Item: React.FC<Props> = ({ task }) => {
  return (
    <li className="mb-2">
      {task.name}
      {/* {task?.pr && (
        <div className="ml-4">
          GitHub PR:
          <ul>
            <li>Owner: {task.pr.owner}</li>
            <li>Repo: {task.pr.repo}</li>
            <li>Pull Number: {task.pr.pull_number}</li>
          </ul>
        </div>
      )} */}
    </li>
  );
};

export { Item as TaskItem };
