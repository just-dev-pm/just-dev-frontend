"use client";

import useSWRImmutable from "swr/immutable";
import { fakeProjects } from "@/lib/Mockdata";
import { useUserStore } from "@/store/userStore";
import { BASE_URL } from "@/lib/global";
import { Projects } from "@/types/projects";
import ProjectsRender from "./components/projects-render";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";
import useProjectStore from "@/store/projectStore";
import { Button } from "@/components/ui/button";
import CreateProjectController from "./components/create-project-controller";

export default function ProjectsPage() {
  const userId = useUserStore.getState().userId;
  const setRawProjects = useProjectStore(state => state.setRawProjects);
  const { data, error, isLoading } = useSWRImmutable<Projects>(
    `/api/users/${userId}/projects`,
    url =>
      fetch(`${BASE_URL}${url}`, {
        credentials: "include",
      }).then(res => res.json()),
    { fallbackData: { projects: [] } }
  );
  useEffect(() => {
    if (data?.projects.length) {
      setRawProjects(data.projects);
    }
  }, [data]);
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
  return error ? (
    <div>{error}</div>
  ) : (
    <div className="flex flex-col gap-4">
      <CreateProjectController />
      <div className="grid xl:grid-cols-[1fr_1fr_1fr]  gap-4">
        <ProjectsRender projects={data!} />
      </div>
    </div>
  );
}
