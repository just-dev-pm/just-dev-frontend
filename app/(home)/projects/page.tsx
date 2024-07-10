"use client";

import useSWR from "swr";
import ProjectsView from "../components/projects-view";
import { fakeProjects } from "@/lib/Mockdata";
import { useUserStore } from "@/store/userStore";
import { BASE_URL } from "@/lib/global";
import { Suspense } from "react";
import { Project } from "@/types/projects";

export default function HomePage() {
  const userId = useUserStore((state) => state.userId);
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/projects`;
  const { data, error } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, userId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        credentials: "include",
      }).then(
        (res) => {
          if(!res.ok){
            throw new Error(`Error! Status:${res.status}`)
          }
          return res.json()
        }),
    { suspense: true, fallbackData: { projects: [] } }
  );
  const projects: Project[] = data.projects;
  return (
    error ? <div>{error}</div> :
    <div className="grid xl:grid-cols-[1fr_1fr_1fr]  gap-4">
      <Suspense fallback={<div>loading...</div>}>
        <ProjectsView projects={projects} />
      </Suspense>
    </div>
  );
}
