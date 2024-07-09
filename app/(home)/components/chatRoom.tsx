import { useState, useEffect, useRef, SetStateAction } from "react";
import { customAlphabet } from "nanoid";
import { YjsClient, Message, MessageAwareness } from "./chat-client";

export default function ChatRoom(props: {
    roomId: string;
    user_name: string;
    hosturl:string;
  }){
    return <ChatDataProvider {...props}></ChatDataProvider>
}

function ChatDataProvider({
  roomId,
  user_name,
  hosturl,
}: {
  roomId: string;
  user_name: string;
  hosturl:string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState(roomId);
  const yjsClientRef = useRef<YjsClient | null>(null);
  const [awarness, setAwarness] = useState<MessageAwareness>(new Map());

  useEffect(() => {
    //获取用户名
    const username = user_name || customAlphabet("asdasdas", 10)();

    //链接ws
    const yjsClient = new YjsClient(room, username,hosturl);

    setMessages([]);
    yjsClientRef.current = yjsClient;

    yjsClientRef.current.onMessagesChange((event) => {
      setMessages(event.target.toArray());
    });

    yjsClient.onAwarenessChange((state) => {
      setAwarness(new Map([...state]));
    });

    return () => {
      yjsClient.destroy();
      yjsClientRef.current = null;
    };
  }, [room]);

  const handleSendMessage = () => {
    if (!newMessage) {
      return;
    }
    yjsClientRef.current?.addMessage(newMessage);
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
    <div>
      <div>房间ID: {room}</div>
      <input
        value={newMessage}
        onInput={(e) => setNewMessage((e.target as HTMLInputElement).value)}
      />
      <button
        onClick={() => {
          handleSendMessage();
          setNewMessage("");
        }}
      >
        发送消息
      </button>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.auth}: {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}