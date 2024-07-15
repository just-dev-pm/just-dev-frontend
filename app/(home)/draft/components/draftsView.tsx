import Link from "next/link";
import { DraftsCard } from "./draftsCard";

interface Draft {
  id: string;
  name: string;
}

export default function DraftsView({ drafts }: { drafts: Draft[] }) {
  return (
    <>
      {drafts.map(draft => {
        return (
          <div key={draft.id} className="relative">
            <DraftsCard draft={draft}></DraftsCard>
          </div>
        );
      })}
    </>
  );
}
