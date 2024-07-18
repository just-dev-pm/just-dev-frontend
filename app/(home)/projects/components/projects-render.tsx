"use client";
import { useProject } from "@/app/api/project/get-project";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import Loading from "@/components/ui/loading";
import useMenuTabStore from "@/store/menuTabStore";
import { Projects, Project as RawProject } from "@/types/projects";
import { useEffect } from "react";
import { ProjectStatusPoolProvider } from "../../components/status/status-pool/project/context";
import ProjectCard from "./project-card";

interface ProjectsRenderProps {
  projects: Projects;
}
export default function ProjectsRender({ projects }: ProjectsRenderProps) {
  if (!projects || projects.projects.length === 0) return <Loading />;
  return (
    <>
      {projects.projects.map((rawProject: RawProject) => (
        <div key={rawProject.id}>
          <ProjectRender rawProject={rawProject} />
        </div>
      ))}
    </>
  );
}

interface ProjectRenderProps {
  rawProject: RawProject;
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
  return (
    <ProjectStatusPoolProvider projectId={rawProject.id}>
      <ProjectCard
        data={data}
        position={rawProject.position === "admin" ? "管理员" : "成员"}
        onEnterProject={onEnterProject}
      />
    </ProjectStatusPoolProvider>
  );
}
