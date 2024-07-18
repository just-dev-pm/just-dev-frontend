"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { hostUrl } from "@/lib/global";
import ChatRoom from "../../components/chatRoom";
import Doc from "../../components/doc";
import Whiteboard from "../../components/whiteboard";
import { useUserInfo } from "@/app/api/useUserInfo";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { HOST_URL } from "@/lib/global";

interface IProps {
  params: { draft_id: string };
}
export default function ConcreteDraftPage({ params }: IProps) {
  const userId = useUserStore((status) => status.userId);
  const { draft_id } = params;
  const hostUrl = HOST_URL!;
  const [doc, setDoc] = useState<Y.Doc>(new Y.Doc());
  const [provider, setProvider] = useState<WebsocketProvider>(
    new WebsocketProvider(hostUrl, draft_id, doc),
  );
  const { data: user_data, error: user_error } = useUserInfo({ userId });

  if (user_error) return <>Error</>;

  useEffect(() => {
    return () => {
      provider?.disconnect();
    };
  }, []);
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
          doc={doc}
          provider={provider}
        ></ChatRoom>
      </TabsContent>
      <TabsContent value="doc">
        <Doc doc={doc} provider={provider}></Doc>
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
