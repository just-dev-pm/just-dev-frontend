"use client";

import { useEffect, useState } from "react";
import MenuItem from "../../components/menu-item";
import ProjectsSelect from "./projects-select";
import useProjectStore from "@/store/projectStore";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useMyProjects } from "@/app/api/project/get-my-projects";

export interface IProject {
  project_id: string;
  project_name: string;
}

export default function ProjectMenu() {
  const [selectValue, setSelectValue] = useState<string>("");

  const pathname = usePathname();
  const match = pathname.match(/^\/projects\/([^\/]+).*$/);
  useEffect(() => {
    if (match) {
      const project_id = pathname.split("/")[2];
      setSelectValue(project_id);
    }
  }, [match]);
  const router = useRouter();

  function to(path: string) {
    return `/projects/${selectValue}${path}`;
  }
  function handleValueChange(newProjectId: string) {
    router.push(`/projects/${newProjectId}/dashboard`);
    setSelectValue(newProjectId);
  }

  const { data } = useMyProjects();
  return (
    <>
      <ProjectsSelect
        projects={data?.projects ?? []}
        value={selectValue}
        handleValueChange={handleValueChange}
        className="px-4 my-2"
      />
      {!!selectValue && (
        <>
          <MenuItem href={to("/dashboard")}>仪表盘</MenuItem>
          <Separator className="my-2" />
          <MenuItem href={to("/requirements")}>需求</MenuItem>
          <MenuItem href={to("/agenda")}>日程</MenuItem>
          <MenuItem href={to("/tasks")}>任务</MenuItem>
          <MenuItem href={to("/draft")}>草稿</MenuItem>
          <Separator className="my-2" />
          <MenuItem href={to("/settings")}>设置</MenuItem>
        </>
      )}
    </>
  );
}
