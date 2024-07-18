import { useUserInfo } from "@/app/api/useUserInfo";
import { useUserStore } from "@/store/userStore";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { StatusContent, StatusPool } from "./response"; // 替换为你的实际文件路径和导入方式

// 创建 Context
export const CustomContext = createContext<{
  statusPool: StatusPool | null;
  getStatusById: (id: string) => StatusContent | null;
}>({
  statusPool: null,
  getStatusById: () => null,
});

// Context Provider
const CustomProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userId = useUserStore.getState().userId;
  const { data } = useUserInfo({ userId });

  // 提取 status_pool
  const statusPool = data?.status_pool || null;

  // 根据 id 获取状态信息的方法
  const getStatusById = (id: string): StatusContent | null => {
    if (!statusPool) return null;

    if (id === "complete") {
      return statusPool.complete;
    } else {
      const incompleteStatus = statusPool.incomplete.find(
        (item) => item.id === id,
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
export { CustomProvider as StatusPoolProvider };

// 自定义 hook，用于在组件中访问 Context
export const useStatusPool = () => useContext(CustomContext);
