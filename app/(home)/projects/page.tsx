"use client";

import useMyProjects from "@/app/apiTyped/project/useUserProjects";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";
import CreateProjectController from "./components/create-project-controller";
import ProjectsRender from "./components/projects-render";

export default function ProjectsPage() {
  const { data, mutate:mutateMyProjects, isLoading } = useMyProjects();
  useEffect(() => {
    if (!data) mutateMyProjects();
  }, []);

  if (!data || isLoading) return <Loading />;
  if (data?.projects.length === 0)
    return (
      <div className="flex h-screen items-center justify-center">
        <h3 className="flex items-center">
          你还没有项目, 点击{" "}
          <CreateProjectController variant="default" className="mx-4" />
          开启你的旅程吧
        </h3>
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <h4 className="grow">项目列表</h4>
        <CreateProjectController />
      </div>

      <div className="grid xl:grid-cols-[1fr_1fr]  gap-4">
        <ProjectsRender projects={data} />
      </div>
    </div>
  );
}
