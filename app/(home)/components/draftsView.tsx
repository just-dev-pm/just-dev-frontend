import { DraftsCard } from "./draftsCard";

interface Draft{
    id:string;
    name:string;
}

export default function DraftsView({drafts}:{drafts:Draft[]}){
    return <>
        {drafts.map(draft=>{
        return <DraftsCard draft={draft}></DraftsCard>
    })}
    </>

}