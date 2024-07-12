"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { hosturl } from "@/lib/global";
import ChatRoom from "@/app/(home)/components/chatRoom";
import Doc from "@/app/(home)/components/doc";
import Whiteboard from "@/app/(home)/components/whiteboard";
import { useUserStore } from "@/store/userStore";
import useDraft from "@/app/api/Draft/get-draft";
import { useUserInfo } from "@/app/api/useUserInfo";

interface IProps {
  params: { draft_id: string };
}
export default function ConcreteDraftPage({ params }: IProps) {
  const userId = useUserStore(stats => stats.userId)
  const { draft_id } = params;
  const hostUrl = "ws://localhost:3000/ws/drafts/"
  const {data: draft_data,error:draft_error} = useDraft({draft_id})
  const {data: user_data,error:user_error} = useUserInfo({userId})
  return (
    <Tabs defaultValue="chat">
      <TabsList>
        <TabsTrigger value="chat">聊天</TabsTrigger>
        <TabsTrigger value="doc">文档</TabsTrigger>
        <TabsTrigger value="whiteboard">白板</TabsTrigger>
      </TabsList>
      <TabsContent value="chat">
        <ChatRoom
          roomId={draft_id}
          user_name={user_data.username}
          hosturl={hostUrl}
        ></ChatRoom>
      </TabsContent>
      <TabsContent value="doc">
        <Doc roomId={draft_id} hosturl={hostUrl}></Doc>
      </TabsContent>
      <TabsContent value="whiteboard">
        <Whiteboard
          roomId={draft_id}
          hostUrl={hostUrl}
          metaId={draft_id}
        ></Whiteboard>
      </TabsContent>
    </Tabs>
  );
}
