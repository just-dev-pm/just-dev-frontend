import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StackItem } from "quill/modules/history";
import {
  CompleteStatusView,
  InCompleteStatusView,
} from "../projects/components/status-view";

// 生成三个示例项目数据
const fakeProjects: Project[] = [
  {
    id: "1",
    name: "Project A",
    description: "This is project A description.",
    avatar: "/images/avatar1.jpg",
    status_pool: {
      complete: { name: "Complete", description: "Project A is complete." },
      incomplete: [
        {
          id: "1",
          status: { name: "Task 1", description: "Task 1 is incomplete." },
        },
        {
          id: "2",
          status: { name: "Task 2", description: "Task 2 is incomplete." },
        },
      ],
    },
  },
  {
    id: "2",
    name: "Project B",
    description: "This is project B description.",
    avatar: "/images/avatar2.jpg",
    status_pool: {
      complete: { name: "Complete", description: "Project B is complete." },
      incomplete: [
        {
          id: "3",
          status: { name: "Task 3", description: "Task 3 is incomplete." },
        },
        {
          id: "4",
          status: { name: "Task 4", description: "Task 4 is incomplete." },
        },
      ],
    },
  },
  {
    id: "3",
    name: "干饭人干饭魂",
    description: "This is project C description.",
    avatar: "/images/avatar3.jpg",
    status_pool: {
      complete: { name: "吃完了", description: "真香." },
      incomplete: [
        {
          id: "5",
          status: { name: "干饭中", description: "吭哧吭哧." },
        },
        {
          id: "6",
          status: { name: "赶路中", description: "正在骑马赶来的路上." },
        },
      ],
    },
  },
];

// 输出三个项目的 Card
export default function ProjectsView() {
  return (
    <>
      {fakeProjects.map(project => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex">
              <div className="flex gap-4 items-center grow">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{project.name}</CardTitle>
              </div>
              <Button>进入项目</Button>
            </div>
            <CardDescription>管理员</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
          </CardContent>
          {project.status_pool && (
            <CardContent>
              <p>
                <div className="flex gap-2">
                  <span className="line-clamp-1">状态池</span>
                  <CompleteStatusView status={project.status_pool.complete} />

                  {project.status_pool.incomplete.map(task => (
                    <InCompleteStatusView c={task} key={task.id} />
                  ))}
                </div>
              </p>

              <ul></ul>
            </CardContent>
          )}
        </Card>
      ))}
    </>
  );
}
