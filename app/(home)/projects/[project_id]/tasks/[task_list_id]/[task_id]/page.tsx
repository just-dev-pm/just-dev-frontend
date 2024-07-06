interface IProps {
  params: { task_id: string };
}
export default function ConcreteTaskPage({ params }: IProps) {
  const { task_id } = params;
  return <div>Task {task_id}</div>;
}
