import Quill from "quill";
import { useRef, useEffect } from "react";
import { QuillBinding } from "y-quill";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Button } from "@/components/ui/button";
import "quill/dist/quill.snow.css";

export default function Doc(props: {
  doc: Y.Doc;
  provider: WebsocketProvider;
}) {
  return <YQuillDataProvider {...props}></YQuillDataProvider>;
}

function YQuillDataProvider({
  doc,
  provider
}: {
  doc: Y.Doc;
  provider: WebsocketProvider
}) {
  const ydoc = useRef<Y.Doc>(doc);
  const quillRef = useRef<Quill | null>(null);
  const ytext = useRef<Y.Text | null>(null);

  useEffect(() => {
    ydoc.current = doc
    quillRef.current = new Quill("#editor-container", {
      theme: "snow",
      modules: {
        // toolbar:''
        toolbar: "#toolbar-container",
        // ['bold','italic','underline','strike'],
        // [{ 'color': [] }, { 'background': [] }],
      },
    });
    //一个ytext对应一个草稿
    ytext.current = ydoc.current.getText("content");
    const binding = new QuillBinding(ytext.current, quillRef.current,provider.awareness);

    const customButton = document.querySelector("#custom-button");
    customButton?.addEventListener("click", () => {
      console.log("clicked!");
    });

    // 关闭时清理
    return () => {

    };
  }, []);

  return <YQuillRenderer></YQuillRenderer>;
}

function YQuillRenderer() {
  return (
    <div>
      <div id="toolbar-container">
        {/* Quill 的工具栏 */}
        <button className="ql-bold">Bold</button>
        <button className="ql-italic">Italic</button>
        <button className="ql-underline">Underline</button>
        <button className="ql-strike">Strike</button>
        <button id="custom-button">hello?</button>
      </div>
      <div id="editor-container" style={{ height: "400px" }}>
        {/* Quill 编辑器 */}
      </div>
    </div>
  );
}
