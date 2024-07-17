import { ChangeRelationContextProvider } from "./context";
import { ChangeRelationSchema } from "./request";
import { useSWRChangeRelation } from "./swr";
import { ChangeRelationTrigger } from "./trigger";

interface ControlProps {
  linkId: string;
}
const Control: React.FC<ControlProps> = ({ linkId }) => {
  const { trigger } = useSWRChangeRelation(linkId);
  return (
    <ChangeRelationContextProvider
      onSubmit={(data: ChangeRelationSchema) => {
        trigger(data);
      }}
    >
      <ChangeRelationTrigger />
    </ChangeRelationContextProvider>
  );
};

export { Control as ChangeRelationControl };
