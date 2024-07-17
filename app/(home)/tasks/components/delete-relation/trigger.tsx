"use client";
import React from "react";
import { Button } from "rsuite";
import { useSWRDeleteRelation } from "./swr";
import { mutate } from "swr";

interface TriggerProps {
  linkId: string;
  mutateDelete: (linkId: string) => void
}
const Trigger: React.FC<TriggerProps> = ({ linkId , mutateDelete }) => {

  return (
    <>
      <Button
        onClick={() => {
          mutateDelete(linkId)
        }}
        appearance="link"
        className="text-red-400 focus:text-red-700 hover:text-red-700"
      >
        删除
      </Button>
    </>
  );
};

export { Trigger as DeleteRelationTrigger };
