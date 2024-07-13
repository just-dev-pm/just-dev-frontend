interface IProps {
  c: string;
}

export default function MaxLineOne(props: IProps) {
  return <span className="truncate">{props.c}</span>;
}
