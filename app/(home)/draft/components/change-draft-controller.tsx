import useDraft from "@/app/apiTyped/draft/useDraft";
import { ChangeDraftForm } from "./change-draft-form";

interface IProps {
  draft_id: string;
}
export default function ChangeDraftController(props: IProps) {
  const { data: oldData } = useDraft(props.draft_id);
  if (!oldData.name) return <></>;
  return <ChangeDraftForm draft_id={props.draft_id} oldData={oldData} />;
}
