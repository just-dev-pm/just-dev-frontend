"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hosturl } from "@/lib/global";
import ChatRoom from "../../components/chatRoom";
import Doc from "../../components/doc";
import Whiteboard from "../../components/whiteboard";

interface IProps {
  params: { draft_id: string };
}
export default function ConcreteDraftPage({ params }: IProps) {
  const { draft_id } = params;
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
          user_name={draft_id}
          hosturl={hosturl}
        ></ChatRoom>
      </TabsContent>
      <TabsContent value="doc">
        <Doc roomId={draft_id} hosturl={hosturl}></Doc>
      </TabsContent>
      <TabsContent value="whiteboard">
        <Whiteboard
          roomId={draft_id}
          hostUrl={hosturl}
          metaId={draft_id}
        ></Whiteboard>
      </TabsContent>
    </Tabs>
  );
}
