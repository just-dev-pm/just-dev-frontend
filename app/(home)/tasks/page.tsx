"use client";

import { TaskListControl } from "./components/list/control";
import { UserTasksProvider } from "./components/list/user/context";
import { TasklistDialog } from "./components/tasklistDialog";

const TaskListsPage: React.FC = () => {
  return (
    <UserTasksProvider>
      <div className="flex flex-col gap-4">
        <div className="flex pr-2">
          <h4>任务列表</h4>
          <TasklistDialog project={{ isProject: false, project_id: "" }}>
            新建列表
          </TasklistDialog>
        </div>
        <TaskListControl />
      </div>
    </UserTasksProvider>
  );
};

export default TaskListsPage;
