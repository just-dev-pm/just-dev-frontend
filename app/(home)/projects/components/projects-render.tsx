"use client";
import Loading from "@/components/ui/loading";
import { BASE_URL } from "@/lib/global";
import { Project as RawProject } from "@/types/projects";
import useSWR from "swr";
import ProjectCard from "./project-card";
import { useEffect } from "react";
import useMenuTabStore from "@/store/menuTabStore";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import useProject from "@/app/apiTyped/project/useProjectInfo";
import {Response as Projects,Project} from "@/app/apiTyped/project/useUserProjects"

interface ProjectsRenderProps {
  projects: Projects;
}
export default function ProjectsRender({ projects }: ProjectsRenderProps) {
  if(!projects || projects.projects.length === 0) return <Loading />
  return (
    <>
      {projects.projects.map((rawProject) => (
        <div key={rawProject.id}>
          <ProjectRender rawProject={rawProject} />
        </div>
      ))}
    </>
  );
}

interface ProjectRenderProps {
  rawProject: Project;
}
export function ProjectRender({ rawProject }: ProjectRenderProps) {
  const { data, mutate, error } = useProject(rawProject.id);
  useEffect(() => {
    if (!data?.name) {
      mutate();
    }
  }, []);

  function onEnterProject() {
    useMenuTabStore.getState().setValue("project");
  }
  if (error)
    return (
      <AlertDestructive
        title={`获取项目信息(ID=${rawProject.id})时遇到错误`}
        description="请检查你的网络并等待服务器恢复正常"
      />
    );
  if (!data) return <Loading />;
  if(data){
    return (
      <ProjectCard
        data={data}
        position={rawProject.position === "admin" ? "管理员" : "成员"}
        onEnterProject={onEnterProject}
      />
    );
  }
}
