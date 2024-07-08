"use client";

import { useEffect, useState } from "react";
import MenuItem from "../../components/menu-item";
import ProjectsSelect from "./projects-select";
import { useProjectStore } from "@/store/projectStore";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";

export interface IProject {
  project_id: string;
  project_name: string;
}

export default function ProjectMenu() {
  const adaptee = useProjectStore(state => state.projects);
  const defaultProject = useProjectStore(state => state.defaultId);
  const setDefaultProject = useProjectStore(state => state.setDefaultId);
  const idExists = useProjectStore(state => state.idExists);
  const projects: IProject[] = adaptee.map(({ id, name }) => ({
    project_id: id,
    project_name: name,
  }));
  // const pathname = usePathname();
  // useEffect(() => {
  //   const match = pathname.match(/^\/projects\/([^\/]+).*$/);
  //   if (match) {
  //     const project_id = pathname.split("/")[2];

  //     if (project_id === defaultProject && idExists(project_id))
  //       setDefaultProject(project_id);
  //   }
  // });

  function to(path: string) {
    return `/projects/${defaultProject}${path}`;
  }
  return (
    <>
      <ProjectsSelect
        projects={projects}
        project={defaultProject}
        setProject={setDefaultProject}
        className="px-4 my-2"
      />
      {defaultProject && (
        <>
          <MenuItem href={to("/dashboard")}>仪表盘</MenuItem>
          <MenuItem href={to("/requirements")}>需求</MenuItem>
          <MenuItem href={to("/agenda")}>日程</MenuItem>
          <MenuItem href={to("/tasks")}>任务</MenuItem>
          <MenuItem href={to("/draft")}>草稿</MenuItem>
          <MenuItem href={to("/settings")}>设置</MenuItem>
        </>
      )}
    </>
  );
}
