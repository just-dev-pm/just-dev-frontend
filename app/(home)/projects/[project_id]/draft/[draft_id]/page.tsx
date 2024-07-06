interface IProps {
  params: { draft_id: string };
}
export default function ConcreteDraftPage({ params }: IProps) {
  const { draft_id } = params;
  return <div>Draft {draft_id}</div>;
}
