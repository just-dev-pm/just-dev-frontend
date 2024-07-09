import Quill from "quill";
import { useRef, useEffect } from "react";
import { QuillBinding } from "y-quill";
import * as Y from 'yjs';
import { WebsocketProvider } from "y-websocket";
import { Button } from "@/components/ui/button";
import 'quill/dist/quill.snow.css';

export default function Doc(props:{roomId:string,hosturl:string}){
    return <YQuillDataProvider {...props}></YQuillDataProvider>
}


function YQuillDataProvider({roomId,hosturl}:{roomId:string,hosturl:string}){
    const ydoc = useRef<Y.Doc | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const ytext = useRef<Y.Text | null>(null);
  
    useEffect(() => {
      ydoc.current = new Y.Doc();
      const provider = new WebsocketProvider(hosturl,roomId, ydoc.current);
      quillRef.current = new Quill("#editor-container", {
        theme: "snow",
        modules: {
          // toolbar:''
          toolbar: '#toolbar-container'
              // ['bold','italic','underline','strike'],
              // [{ 'color': [] }, { 'background': [] }],
        },
      });
      //一个ytext对应一个草稿
      ytext.current = ydoc.current.getText("content");
      const binding = new QuillBinding(ytext.current, quillRef.current);
  
      const customButton = document.querySelector('#custom-button')
      customButton?.addEventListener('click',()=>{
        console.log("clicked!");
      })


      // 关闭时清理
      return () => {
        binding.destroy();
        provider.disconnect();
      };
    }, []);

    return (
        <YQuillRenderer></YQuillRenderer>
    )
}



function YQuillRenderer(){
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
          <div id="test">hello???</div>
        </div>
      );
}
