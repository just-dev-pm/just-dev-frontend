interface IProps {
  params: { agenda_item_id: string };
}
export default function AgendaItemPage({ params }: IProps) {
  const { agenda_item_id } = params;
  return <div>AgendaItem {agenda_item_id}</div>;
}
