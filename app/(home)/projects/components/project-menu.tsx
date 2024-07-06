"use client";

import { useState } from "react";
import MenuItem from "../../components/menu-item";
import ProjectsSelect from "./projects-select";

export interface IProject {
  project_id: string;
  project_name: string;
}

export default function ProjectMenu() {
  const projects: IProject[] = [
    { project_id: "a", project_name: "just dev" },
    { project_id: "b", project_name: "nymph" },
  ];
  const [project, setProject] = useState<string>();

  function to(path: string) {
    return `/projects/${project}${path}`;
  }
  return (
    <>
      <small>项目空间</small>
      <ProjectsSelect
        projects={projects}
        project={project}
        setProject={setProject}
        className="px-4"
      />
      {project && (
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
