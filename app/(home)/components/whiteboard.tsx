import { useYjsStore } from "./useYjsStore";
import { TLComponents, Tldraw, TLStoreWithStatus } from "@tldraw/tldraw";
import 'tldraw/tldraw.css'

function Whiteboard(props:{roomId:string,hostUrl:string,metaId:string}){
    return <TlDrawDataProvider {...props}></TlDrawDataProvider>
}


function TlDrawDataProvider({roomId,hostUrl,metaId}:{roomId:string,hostUrl:string,metaId:string}){
    const store = useYjsStore({
		roomId: roomId,
		hostUrl: hostUrl,
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