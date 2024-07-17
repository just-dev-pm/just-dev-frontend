import { useState, useEffect, useRef, SetStateAction } from "react";
import { customAlphabet, nanoid } from "nanoid";
import { YjsClient, Message, MessageAwareness } from "./chat-client";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function ChatRoom(props: {
  roomId: string;
  user_name: string;
  doc: Y.Doc;
  provider: WebsocketProvider;
}) {
  return <ChatDataProvider {...props}></ChatDataProvider>;
}

function ChatDataProvider({
  roomId,
  user_name,
  provider,
  doc,
}: {
  roomId: string;
  user_name: string;
  doc: Y.Doc;
  provider: WebsocketProvider;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState(roomId);
  const yjsClientRef = useRef<YjsClient | null>(null);
  const [awarness, setAwarness] = useState<MessageAwareness>(new Map());
  const [yMessages, setYMessages] = useState<Y.Array<unknown> | null>();

  useEffect(() => {
    const messages = doc.getArray("Chat");
    console.log("big bug!");
    //获取用户名
    const username = user_name || customAlphabet("asdasdas", 10)();

    //链接ws
    // const yjsClient = new YjsClient(room, username,provider,doc);

    const awareness = provider.awareness;
    awareness.setLocalState({ user: { name: username, color: nanoid() } });

    // function onMessagesChange(
    //   callback: (
    //     event: Y.YArrayEvent<Message>,
    //   ) => void
    // ) {
    //   messages.observe((event) => {
    //     console.log("callback trigerred");
    //     callback(event as Y.YArrayEvent<Message>);
    //   });
    // }

    function onAwarenessChange(callback: (state: MessageAwareness) => void) {
      awareness.on("change", (changed: any, origin: any) => {
        if (origin === "local") return; // 自己的操作不触发回调
        callback(awareness.getStates() as MessageAwareness);
      });
    }

    // setMessages([]);

    // onMessagesChange((event) => {
    //   console.log(event.target.toArray());
    //   setMessages(event.target.toArray());
    // });

    messages.observe(event => {
      console.log(event.target.toArray());
      setMessages(event.target.toArray());
    });

    onAwarenessChange(state => {
      setAwarness(new Map([...state]));
    });

    setYMessages(messages);
    return () => {};
  }, [room]);

  function addMessage(text: string) {
    yMessages.unshift([
      {
        id: nanoid(),
        auth: provider.awareness.getLocalState()!.user.name,
        text,
      },
    ]);
  }

  const handleSendMessage = () => {
    if (!newMessage) {
      return;
    }
    addMessage(newMessage);
  };

  return (
    <ChatRenderer
      room={room}
      newMessage={newMessage}
      messages={messages}
      setNewMessage={setNewMessage}
      handleSendMessage={handleSendMessage}
    ></ChatRenderer>
  );
}

function ChatRenderer({
  room,
  newMessage,
  messages,
  setNewMessage,
  handleSendMessage,
}: {
  room: string;
  newMessage: string;
  messages: Message[];
  setNewMessage: (value: SetStateAction<string>) => void;
  handleSendMessage: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="grow overflow-auto">
        {messages.map(msg => (
          <Card key={msg.id}>
            <CardHeader>
              <CardDescription>{msg.auth}</CardDescription>
            </CardHeader>
            <CardContent>{msg.text}</CardContent>
          </Card>
        ))}
      </div>
      <div className="flex-none grid w-full gap-2">
        <Textarea
          placeholder="新消息"
          value={newMessage}
          onInput={e => setNewMessage((e.target as HTMLInputElement).value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 阻止默认的 Enter 提交行为
              handleSendMessage();
              setNewMessage("");
            } else if (e.key === "Enter" && e.shiftKey) {
              setNewMessage(state => state + "\n");
            }
          }}
        />
        <Button
          onClick={() => {
            handleSendMessage();
            setNewMessage("");
          }}
        >
          发送
        </Button>
      </div>
    </div>
  );
}
