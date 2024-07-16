import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserNameRender from "./user-name-render";
import ProjectNameRender from "@/app/(home)/projects/components/project-name-render";
import { useToast } from "@/components/ui/use-toast";
export interface InvitationData {
  invitor_id: string;
  invitee_id: string;
  project_name: string;
}
export default function InvitationView({
  data,
  onJoin,
}: {
  data: InvitationData;
  onJoin: () => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
      <Card>
        <CardHeader>
          <CardTitle>邀请函</CardTitle>
          <CardDescription>
            致 <UserNameRender id={data.invitee_id} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserNameRender id={data.invitor_id} /> 邀请你加入{" "}
          <span>{data.project_name}</span> 项目.
        </CardContent>
        <CardFooter>
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-85 hover:text-opacity-85 transition"
            onClick={() => onJoin()}
          >
            加入
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
