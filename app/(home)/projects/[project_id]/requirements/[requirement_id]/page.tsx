interface IProps {
  requirement_id: string;
}
export default function RequirementPage({ requirement_id }: IProps) {
  return <div>Requirement {requirement_id}</div>;
}
