import { useYjsStore } from "./useYjsStore";
import { TLComponents, Tldraw, TLStoreWithStatus } from "@tldraw/tldraw";
import * as Y from 'yjs'
import 'tldraw/tldraw.css'
import { WebsocketProvider } from "y-websocket";

function Whiteboard(props:{roomId:string,metaId:string,doc:Y.Doc,provider:WebsocketProvider}){
    return <TlDrawDataProvider {...props}></TlDrawDataProvider>
}


function TlDrawDataProvider({roomId,metaId,doc,provider}:{roomId:string,metaId:string,doc:Y.Doc,provider:WebsocketProvider}){
    const store = useYjsStore({
		doc:doc,
		provider:provider,
		roomId: roomId,
        metaId: metaId
	})
    return (
        <TlDrawRenderer store={store} components={undefined}></TlDrawRenderer>
    )
}

function TlDrawRenderer({store,components}:{store:TLStoreWithStatus,components:TLComponents | undefined}){
    return (
		<div className="tldraw__editor" style={{height:"88vh"}}>
			<Tldraw
				autoFocus
				store={store}
				components={
                    components
					//SharePanel: NameEditor,
				}
			/>
		</div>
	)
}

export default Whiteboard;