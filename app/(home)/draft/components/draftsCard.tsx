import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ChangeDraftController from "./change-draft-controller";
import HoverName from "../../components/hover-name";

interface Draft {
  id: string;
  name: string;
}

export function DraftsCard({ draft }: { draft: Draft }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <HoverName name={draft.name} />
          <div className="flex gap-2 justify-center items-center">
            <ChangeDraftController draft_id={draft.id} />
            <Link href={`./draft/${draft.id}`}>
              <Button>查看</Button>
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
