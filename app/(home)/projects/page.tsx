"use client";
"use client";

import useSWR from "swr";
import { fakeProjects } from "@/lib/Mockdata";
import { useUserStore } from "@/store/userStore";
import { BASE_URL } from "@/lib/global";
import { Projects } from "@/types/projects";
import ProjectsRender from "./components/projects-render";
import Loading from "@/components/ui/loading";

export default function ProjectsPage() {
  const userId = useUserStore.getState().userId;
  const { data } = useSWR<Projects>(
    userId,
    userId =>
      fetch(`${BASE_URL}/api/users/${userId}/projects`, {
        credentials: "include",
      }).then(res => res.json()),
    { fallbackData: { projects: [] } }
  );
  if (data?.projects.length === 0) return <Loading />;
  return error ? (
    <div>{error}</div>
  ) : (
    <div className="grid xl:grid-cols-[1fr_1fr_1fr]  gap-4">
      <ProjectsRender projects={data!} />
    </div>
  );
}
