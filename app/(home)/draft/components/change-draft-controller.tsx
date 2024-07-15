import useDraft from "@/app/api/draft/get-draft";
import { ChangeDraftForm } from "./change-draft-form";

interface IProps {
  draft_id: string;
}
export default function ChangeDraftController(props: IProps) {
  const { data: oldData } = useDraft({ draft_id: props.draft_id });
  if (!oldData.name) return <></>;
  return <ChangeDraftForm draft_id={props.draft_id} oldData={oldData} />;
}
