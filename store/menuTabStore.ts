/**
 * Mostly From Auto Generator
 */
import { create } from "zustand";

// 定义状态和方法的接口
interface MenuTabStore {
  value: "person" | "project"; // value 只能是 'person' 或 'project'
  setValue: (newValue: "person" | "project") => void; // 更改选择的方法
}

// 创建 menuTabStore
const useMenuTabStore = create<MenuTabStore>()(set => ({
  value: "person", // 默认值为 'person'
  setValue: newValue => set({ value: newValue }), // 设置新的 value 值
}));

export default useMenuTabStore;
