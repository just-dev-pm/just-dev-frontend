import { StatusPoolView } from "../view";
import { useProjectStatusPool } from "./context";

const Control = () => {
  const { statusPool } = useProjectStatusPool();
  if (!statusPool) return <></>;
  return <StatusPoolView status_pool={statusPool} />;
};
export { Control as ProjectStatusPoolControl };
