interface IProps {
  params: { agenda_id: string };
}
export default function ConcreteAgendaPage({ params }: IProps) {
  const { agenda_id } = params;
  return <div>Agenda {agenda_id}</div>;
}
