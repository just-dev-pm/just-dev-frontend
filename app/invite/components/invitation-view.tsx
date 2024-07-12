import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export interface InvitationData {
  inviter: string;
  invitee: string;
  project: string;
}
export default function InvitationView({ data,onJoin }: { data: InvitationData,onJoin:()=>void }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
      <Card>
        <CardHeader>
          <CardTitle>邀请函</CardTitle>
          <CardDescription>致 {data.invitee}</CardDescription>
        </CardHeader>
        <CardContent>
          {data.inviter} 邀请你加入 {data.project} 项目.
        </CardContent>
        <CardFooter>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-85 hover:text-opacity-85 transition" onClick={()=>onJoin()}>
            加入
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
