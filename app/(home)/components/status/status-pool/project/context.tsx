import { useProject } from "@/app/api/project/get-project";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { Incomplete, StatusContent, StatusPool } from "../../response"; // 替换为你的实际文件路径和导入方式

// 创建 Context
export const CustomContext = createContext<{
  statusPool: StatusPool | null;
  getStatusById: (id: string) => StatusContent | null;
}>({
  statusPool: null,
  getStatusById: () => null,
});

// Context Provider
const CustomProvider: React.FC<PropsWithChildren & { projectId: string }> = ({
  children,
  projectId,
}) => {
  const { data } = useProject(projectId);

  // 提取 status_pool
  const statusPool = data?.status_pool || null;

  // 根据 id 获取状态信息的方法
  const getStatusById = (id: string): StatusContent | null => {
    if (!statusPool) return null;

    if (id === "complete") {
      return statusPool.complete;
    } else {
      const incompleteStatus = statusPool.incomplete.find(
        (item: Incomplete) => item.id === id,
      );
      return incompleteStatus ? incompleteStatus.status : null;
    }
  };

  return (
    <CustomContext.Provider value={{ statusPool, getStatusById }}>
      {children}
    </CustomContext.Provider>
  );
};

// 重命名导出
export { CustomProvider as ProjectStatusPoolProvider };

// 自定义 hook，用于在组件中访问 Context
export const useProjectStatusPool = () => useContext(CustomContext);
