"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { hostUrl } from "@/lib/global";
import ChatRoom from "../../components/chatRoom";
import Doc from "../../components/doc";
import Whiteboard from "../../components/whiteboard";
import useDraft from "@/app/api/draft/get-draft";
import { useUserInfo } from "@/app/api/useUserInfo";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from 'yjs'

interface IProps {
  params: { draft_id: string };
}
export default function ConcreteDraftPage({ params }: IProps) {
  const userId = useUserStore(status => status.userId)
  const { draft_id } = params;
    const hostUrl = "ws://localhost:3000/ws/drafts/"
    const [doc,setDoc] = useState<Y.Doc>(new Y.Doc())
  const [provider,setProvider] = useState<WebsocketProvider>(new WebsocketProvider(hostUrl,draft_id,doc))
  const { data: draft_data, error: draft_error } = useDraft({ draft_id });
  const { data:user_data, error:user_error} = useUserInfo({userId})
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
        {/* <Doc doc={doc} provider={provider}></Doc> */}
      </TabsContent>
      <TabsContent value="whiteboard">
        {/* <Whiteboard
          doc={doc}
          provider={provider}
          roomId={draft_id}
          metaId={draft_id}
        ></Whiteboard> */}
      </TabsContent>
    </Tabs>
  );
}
