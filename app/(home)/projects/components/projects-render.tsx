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
  const { data } = useSWR<Project>(
    rawProject.id,
    projectId =>
      fetch(`${BASE_URL}/api/projects/${projectId}`, {
        credentials: "include",
      }).then(res => res.json()),

    { fallbackData: { id: "", description: "", name: "" } }
  );
  useEffect(() => {
    if (data) {
      setRipeProject(data);
      console.log("data::: ", data);
    }
  }, [data]);

  function onEnterProject() {
    useMenuTabStore.getState().setValue("project");
  }
  if (!data) return <Loading />;
  return <ProjectCard data={data} onEnterProject={onEnterProject} />;
}
