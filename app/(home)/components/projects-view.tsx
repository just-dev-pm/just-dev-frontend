"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CompleteStatusView,
  InCompleteStatusView,
} from "../projects/components/status-view";
import useSWR from "swr";
import { Project } from "@/types/projects";
import { BASE_URL } from "@/lib/global";
import { Suspense } from "react";
import { Incomplete } from "@/types/project";
import { useProjectStore } from "@/store/projectStore";
import Link from "next/link";

// 生成三个示例项目数据

// 输出三个项目的 Card
export default function ProjectsView({ projects }: { projects: Project[] }) {
  return <>
  {
      projects.map((project) => {
        const url = `/api/projects/`;
        const project_id = project.id;
        const { data, error } = useSWR(
          project_id ? [url, project_id] : null,
          ([url, project_id]) =>
            fetch(BASE_URL + url + project_id, {
              credentials: "include",
            }).then((res) => res.json()),
            
          { suspense: true, fallbackData: {} }
        );
        if (!data) return <div key={data.id}>loading...</div>;
        return (
          <Suspense fallback={<div>loading...</div>} key={data.id}>
            <Card>
              <CardHeader>
                <div className="flex">
                  <div className="flex gap-4 items-center grow">
                    <Avatar>
                      <AvatarImage
                        src={
                          data.avatar
                            ? data.avatar
                            : "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>{data.name}</CardTitle>
                  </div>
                  <Button><Link href={`./projects/${project_id}/dashboard`}>进入项目</Link></Button>
                </div>
                <CardDescription>{project.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{data.description}</p>
              </CardContent>
              {data.status_pool && (
                <CardContent>
                  <div className="flex gap-2">
                    <span className="line-clamp-1">状态池</span>
                    <CompleteStatusView status={data.status_pool.complete} />
    
                    {data.status_pool.incomplete.map((task: Incomplete) => (
                      <InCompleteStatusView c={task} key={task.id} />
                    ))}
                  </div>
    
                  <ul></ul>
                </CardContent>
              )}
            </Card>
          </Suspense>
        );
      })
  }
  </>

}
