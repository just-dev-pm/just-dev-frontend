"use client";

import { Project } from "@/types/project";
import { Project as RawProject } from "@/types/projects";
import { create } from "zustand";
interface RipeProject extends Project {
  isValid: boolean;
}
interface ProjectStore {
  projects: RipeProject[];
  setRawProjects: (rawProjects: RawProject[]) => void;
  setRipeProject: (ripeProject: Project) => void;
}

const useProjectStore = create<ProjectStore>()(set => ({
  projects: [],
  setRawProjects: (rawProjects: RawProject[]) => {
    const projects: RipeProject[] = rawProjects.map(rawProject => ({
      ...rawProject,
      name: "",
      description: "",
      isValid: false,
    }));
    set({ projects });
  },
  setRipeProject: (fullProject: Project) => {
    set(state => ({
      projects: state.projects.map(project =>
        project.id === fullProject.id
          ? { ...project, isValid: true, ...fullProject }
          : project
      ),
    }));
  },
}));

export default useProjectStore;
