import { mutate } from "swr";
import { ChangeRelationContextProvider } from "./context";
import { ChangeRelationSchema } from "./request";
import { useSWRChangeRelation } from "./swr";
import { ChangeRelationTrigger } from "./trigger";

interface ControlProps {
  linkId: string;
  taskId: string;
}
const Control: React.FC<ControlProps> = ({ linkId,taskId }) => {
  const { trigger } = useSWRChangeRelation(linkId);
  return (
    <ChangeRelationContextProvider
      onSubmit={async (data: ChangeRelationSchema) => {
        await trigger(data);
        mutate(["/api/links/tasks/",taskId])
      }}
    >
      <ChangeRelationTrigger />
    </ChangeRelationContextProvider>
  );
};

export { Control as ChangeRelationControl };
