"use client";
import Loading from "@/components/ui/loading";
import { BASE_URL } from "@/lib/global";
import { Project } from "@/types/project";
import { Project as RawProject, Projects } from "@/types/projects";
import useSWR from "swr";
import ProjectCard from "./project-card";
import { useEffect } from "react";
import useProjectStore from "@/store/projectStore";
import useMenuTabStore from "@/store/menuTabStore";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface ProjectsRenderProps {
  projects: Projects;
}
export default function ProjectsRender({ projects }: ProjectsRenderProps) {
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
  const setRipeProject = useProjectStore(state => state.setRipeProject);
  const { data, error, isLoading } = useSWR<Project>(
    rawProject.id,
    projectId =>
      fetch(`${BASE_URL}/api/projects/${projectId}`, {
        credentials: "include",
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res;
        })
        .then(res => res.json()),

    { fallbackData: { id: "", description: "", name: "" } }
  );
  useEffect(() => {
    if (data) {
      setRipeProject(data);
    }
  }, [data]);

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
  if (isLoading || !data) return <Loading />;
  return (
    <ProjectCard
      data={data}
      position={rawProject.position === "admin" ? "管理员" : "成员"}
      onEnterProject={onEnterProject}
    />
  );
}
