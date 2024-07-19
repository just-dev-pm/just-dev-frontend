import { useStatusPool } from "../context";
import { StatusPoolView } from "./view";

const Control = () => {
  const { statusPool } = useStatusPool();
  if (!statusPool) return <></>;
  return <StatusPoolView status_pool={statusPool} />;
};
export { Control as StatusPoolControl };
