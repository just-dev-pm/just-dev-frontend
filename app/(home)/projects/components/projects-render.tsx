"use client";
import Loading from "@/components/ui/loading";
import { BASE_URL } from "@/lib/global";
import { Project } from "@/types/project";
import { Project as RawProject, Projects } from "@/types/projects";
import useSWR from "swr";
import ProjectCard from "./project-card";

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
  console.log(rawProject);
  const { data } = useSWR<Project>(
    rawProject.id,
    projectId =>
      fetch(`${BASE_URL}/api/projects/${projectId}`, {
        credentials: "include",
      }).then(res => res.json()),

    { fallbackData: { id: "", description: "", name: "" } }
  );
  if (!data) return <Loading />;
  return <ProjectCard data={data} />;
}
