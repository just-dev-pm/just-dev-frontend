import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider } from "rsuite";
import { StatusPoolControl } from "../../components/status/status-pool/control";
import EditProfileController from "./edit-profile-controller";
import UserAvatar from "./user-avatar";
import UserId from "./user-id";

export const ProfileView = ({ userData }: { userData: User }) => {
  return (
    <Card className="shadow-md rounded-lg max-w-[33vw]">
      <CardHeader>
        <h5>基本信息</h5>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="flex gap-4 items-center mr-8">
            <UserAvatar avatar={userData?.avatar} className="w-12 h-12" />
            <div className="flex flex-col gap-2">
              <div>{userData?.username || ""}</div>
              <div className="flex gap-4 items-center">
                ID: <UserId id={userData?.id} />
                <CopyToClipboard
                  text={userData?.id}
                  onCopy={() => {
                    toast({
                      title: `成功复制个人ID`,
                      description: userData?.id,
                    });
                  }}
                >
                  <Button
                    appearance="link"
                    className="underline-offset-1 decoration-dashed"
                  >
                    复制ID
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <EditProfileController className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent>邮箱: {userData?.email || "未设置"}</CardContent>
      {userData.status_pool && (
        <>
          <Divider />
          <CardContent>
            <h5>个人任务状态池</h5>

            <StatusPoolControl />
          </CardContent>
        </>
      )}
    </Card>
  );
};
