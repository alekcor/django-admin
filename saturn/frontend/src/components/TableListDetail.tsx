import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  appName?: string;
}

export function TableListDetail(props: RouteComponentProps<MatchParams>) {
  const appName = props.match.params.appName;
  return <div>{appName}</div>;
}
