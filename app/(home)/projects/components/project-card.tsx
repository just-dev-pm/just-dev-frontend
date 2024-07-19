import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types/project";
import Link from "next/link";
import { Divider } from "rsuite";
import { ProjectStatusPoolControl } from "../../components/status/status-pool/project/control";
import UserId from "../../profile/components/user-id";
import ChangeProjectInfoController from "./change-project-info-controller";

/**
 * @params onEnterProject 进入项目: 更改 menuTab
 */
interface ProjectCardProps {
  data: Project;
  position: string;
  onEnterProject: () => void;
}
export default function ProjectCard({
  data,
  position,
  onEnterProject,
}: ProjectCardProps) {
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
            <CardTitle className="max-w-24">
              <div className="truncate leading-snug" title={data.name}>
                {data.name}
              </div>
            </CardTitle>
          </div>
          <div className="flex items-center gap-4 ">
            {position === "管理员" && (
              <ChangeProjectInfoController
                project_id={data.id}
                className="hover:cursor-pointer"
              />
            )}
            <Button asChild>
              <Link
                href={`/projects/${data.id}/dashboard`}
                onClick={() => onEnterProject()}
              >
                进入项目
              </Link>
            </Button>
          </div>
        </div>
        <CardDescription>
          {position} | 项目ID: <UserId id={data.id} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.description}</p>
      </CardContent>
      <Divider className="my-2" />
      {data.status_pool && (
        <CardContent>
          <h5>项目任务状态池</h5>

          <ProjectStatusPoolControl />
        </CardContent>
      )}
    </Card>
  );
}
