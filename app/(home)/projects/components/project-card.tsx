import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Incomplete, Project } from "@/types/project";
import { CompleteStatusView, InCompleteStatusView } from "./status-view";

interface ProjectCardProps {
  data: Project;
}
export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div className="flex gap-4 items-center grow">
            <Avatar>
              <AvatarImage
                src={
                  data.avatar ? data.avatar : "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>{data.name}</CardTitle>
          </div>
          <Button>进入项目</Button>
        </div>
        <CardDescription>{data.position}</CardDescription>
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
  );
}
