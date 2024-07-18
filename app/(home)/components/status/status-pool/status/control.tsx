import { useStatusPool } from "../../context";
import { StatusContainer } from "./container";

interface ControlProps {
  statusId: string;
}
function Control({ statusId }: ControlProps) {
  const { getStatusById } = useStatusPool();
  const status = getStatusById(statusId);

  const isComplete = statusId === "complete";

  if (!status) return <></>;
  return (
    <StatusContainer status={status} color={isComplete ? "green" : "orange"} />
  );
}

export { Control as StatusControl };
