"use client";

import TaskListOverrall from "@/app/(home)/tasks/components/task-list-overrall";

const fakeData = {
  task_lists: [
    {
      id: "1",
      name: "任务列表一",
      tasks: [
        { id: "101", assignees: [{ id: "a1" }, { id: "a2" }] },
        { id: "102", assignees: [{ id: "a3" }] },
      ],
    },
    {
      id: "2",
      name: "任务列表二",
      tasks: [
        { id: "201", assignees: [{ id: "a4" }] },
        { id: "202", assignees: [{ id: "a5" }, { id: "a6" }] },
      ],
    },
  ],
};

const TaskListsPage: React.FC = () => {
  return <TaskListOverrall taskLists={fakeData.task_lists} />;
};

export default TaskListsPage;
