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
          <Link href={`./draft/${draft.id}`} key={draft.id}>
            <DraftsCard draft={draft}></DraftsCard>
          </Link>
        );
      })}
    </>
  );
}
