interface IProps {
  params: { invitation_id: string };
}
export default function InvitePage({ params }: IProps) {
  const { invitation_id } = params;
  return <div>Invitation {invitation_id}</div>;
}
