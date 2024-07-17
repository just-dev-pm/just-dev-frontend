"use client";
import useProjectInfo from "@/app/api/project/get-projectInfo";
import { useUserInfo } from "@/app/api/useUserInfo";
import Loading from "@/components/ui/loading";
import { useUserStore } from "@/store/userStore";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { ExtractStatus } from "./extract-status-pool";

/**
 * @description Arrange
 * 1. Schema
 * 2. Context
 * 3. useContext
 * 4. ContextProvider
 */

// 创建一个上下文对象
const Context = createContext<any>(null);
interface ContextProps extends PropsWithChildren {
  projectId: string;
}
// 自定义钩子，用于快速访问上下文数据
const useCustomContext = () => useContext(Context);

/**
 * 上下文提供程序组件
 * @param children
 * @param isProject
 * @returns React.FC<>
 */
const ContextProvider: React.FC<ContextProps> = ({ projectId, children }) => {
  const { data, isLoading, mutate } = useProjectInfo(projectId);
  const userId = useUserStore.getState().userId;
  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useUserInfo({ userId });
  useEffect(() => {
    if (projectId && !data?.name) {
      mutate();
    }
  }, []);
  if (isLoading || user_loading || (projectId && !data?.id)) return <Loading />;

  const options = ExtractStatus(
    projectId ? data.status_pool : user_data.status_pool,
  );

  return <Context.Provider value={{ options }}>{children}</Context.Provider>;
};

export const useStatusContext = useCustomContext;
export const StatusContextProvider = ContextProvider;
