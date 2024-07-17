"use client";
import React from "react";
import { Button } from "rsuite";
import { useSWRDeleteRelation } from "./swr";
import { mutate } from "swr";

interface TriggerProps {
  linkId: string;
  taskId: string;
}
const Trigger: React.FC<TriggerProps> = ({ linkId, taskId }) => {
  const { trigger } = useSWRDeleteRelation(linkId);
  return (
    <>
      <Button
        onClick={() => {
          trigger();
          mutate(["/api/links/tasks",taskId])
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
