"use cliennt";

import useProjectTasks from "@/app/api/task/get-project-tasks";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { Task } from "./types"; // 确保路径和文件名正确

// 定义 Context 的类型
interface UserTasksContextType {
  isLoading: boolean;
  tasks: Task[] | undefined;
  getTaskById: (taskId: string) => Task | undefined;
}

// 创建 Context
const UserTasksContext = createContext<UserTasksContextType | undefined>(
  undefined,
);

// 定义 Provider 组件
export const ProjectTasksProvider: React.FC<
  PropsWithChildren & { projectId: string }
> = ({ children, projectId }) => {
  const { data, isLoading } = useProjectTasks({ project_id: projectId });

  // 处理获取到的数据
  const tasks = data?.tasks || [];

  console.log("项目任务列表", data);

  // 根据任务 ID 获取任务
  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.find((task) => task.id === taskId);
  };

  // 将 isLoading、tasks 和 getTaskById 提供给 Consumer 使用
  const value: UserTasksContextType = {
    isLoading,
    tasks,
    getTaskById,
  };

  return (
    <UserTasksContext.Provider value={value}>
      {children}
    </UserTasksContext.Provider>
  );
};

// 自定义 hook，用于在组件中获取 Context 的值
export const useProjectAllTasks = (): UserTasksContextType => {
  const context = useContext(UserTasksContext);
  if (!context) {
    throw new Error(
      "useProjectAllTasks must be used within a UserTasksProvider",
    );
  }
  return context;
};
