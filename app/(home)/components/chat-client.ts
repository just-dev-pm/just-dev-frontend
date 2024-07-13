// yjs-client.ts
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { nanoid } from "nanoid";
import { Awareness } from "y-protocols/awareness.js";

export type Message = {
  id: string;
  auth: string;
  text: string;
};

export type MessageAwareness = Map<
  number,
  {
    user: {
      name: string;
      color: string;
    };
  }
>;

export class YjsClient {
  roomId: string;
  ydoc: Y.Doc;
  provider: WebsocketProvider;
  yMessages: Y.Array<Message>;
  awareness: Awareness;

  constructor(roomId: string, username: string, provider:WebsocketProvider,doc:Y.Doc) {
    this.roomId = roomId;
    this.ydoc = doc
    this.provider = provider;
    console.log(provider);
    // 设置本地用户的Awareness状态
    this.awareness = this.provider.awareness;
    this.awareness.setLocalState({ user: { name: username, color: nanoid() } });
    this.yMessages = this.ydoc.getArray(roomId);
  }

  onMessagesChange(
    callback: (
      event: Y.YArrayEvent<Message>,
      transaction: Y.Transaction
    ) => void
  ) {
    this.yMessages.observe(callback);
  }

  onAwarenessChange(callback: (state: MessageAwareness) => void) {
    this.awareness.on("change", (changed: any, origin: any) => {
      if (origin === "local") return; // 自己的操作不触发回调
      callback(this.awareness.getStates() as MessageAwareness);
    });
  }

  addMessage(text: string) {
    this.yMessages.unshift([
      {
        id: nanoid(),
        auth: this.provider.awareness.getLocalState()!.user.name,
        text,
      },
    ]);
  }

  destroy() {
    this.provider.disconnect();
  }
}
