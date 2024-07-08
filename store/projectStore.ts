"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface Project {
  id: string;
  name: string;
}

interface ProjectStore {
  projects: Project[];
  defaultId: string;
  setDefaultId: (id: string) => void;
  addProject: (id: string, name: string) => void;
  getProjectNameById: (id: string) => string | undefined;
  getProjectList: () => Project[];
  idExists: (id: string) => boolean;
}

export const useProjectStore = create<ProjectStore>()(
  immer(
    persist(
      (set, get) => ({
        projects: [
          { id: "1", name: "Just-Dev" },
          { id: "2", name: "Nymph" },
        ],
        defaultId: "",
        setDefaultId: (id: string) =>
          set(state => {
            state.defaultId = id;
          }),
        addProject: (id: string, name: string) =>
          set(state => {
            state.projects.push({ id, name });
          }),
        getProjectNameById: (id: string) =>
          get().projects.find(project => project.id === id)?.name,
        getProjectList: () => get().projects,
        idExists: (id: string) =>
          get().projects.some(project => project.id === id),
      }),
      { name: "project-store" }
    )
  )
);
