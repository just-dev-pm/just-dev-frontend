"use client";

import { TasklistDialog } from "@/app/(home)/tasks/components/tasklistDialog";
import { TaskListControl } from "../../components/list/control";
import { ProjectTasksProvider } from "../../components/list/project/context";
const TaskListsPage = ({ params }: { params: { project_id: string } }) => {
  const { project_id } = params;
  return (
    <ProjectTasksProvider projectId={project_id}>
      <div className="flex flex-col gap-4">
        <div className="flex pr-2">
          <h4>任务列表</h4>
          <TasklistDialog project={{ isProject: true, project_id: project_id }}>
            新建列表
          </TasklistDialog>
        </div>
        <TaskListControl projectId={project_id} />
      </div>
    </ProjectTasksProvider>
  );
};

export default TaskListsPage;
