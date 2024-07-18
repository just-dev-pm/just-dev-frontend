import { StatusPool } from "@/types/project/projectData";
import { StatusContainer } from "./status/container";

interface ViewProps {
  status_pool: StatusPool;
}
const View: React.FC<ViewProps> = ({ status_pool }) => {
  const { complete, incomplete } = status_pool;
  return (
    <div className="p-1 flex gap-2">
      {/* 渲染完成状态 */}
      {complete && <StatusContainer status={complete} color="green" />}

      {/* 渲染未完成状态 */}
      {incomplete &&
        incomplete.map((item) => (
          <StatusContainer status={item.status} color="orange" key={item.id} />
        ))}
    </div>
  );
};

export { View as StatusPoolView };
