import { StatusContainer } from "../status/container";
import { useProjectStatusPool } from "./context";

interface ControlProps {
  statusId: string;
}
function Control({ statusId }: ControlProps) {
  const { getStatusById } = useProjectStatusPool();
  const status = getStatusById(statusId);

  const isComplete = statusId === "complete";

  if (!status) return <></>;
  return (
    <StatusContainer status={status} color={isComplete ? "green" : "orange"} />
  );
}

export { Control as ProjectStatusControl };
