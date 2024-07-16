import { Notification, Source, Asset } from "@/types/notification";
import Link from "next/link";

type TargetSource = "草稿" | "事件" | "任务";
type SourceString = "draft" | "event" | "task";

const sourceToTarget = (source: SourceString): TargetSource => {
  switch (source) {
    case Source.Draft:
      return "草稿";
    case Source.Event:
      return "事件";
    case Source.Task:
      return "任务";
    default:
      throw new Error("未知的资产类型");
  }
};

const pathToTarget = (asset:Asset): string => {
  switch(asset.source) {
    case Source.Draft:
      return asset.path.project_id ?  `/projects/${asset.path.project_id}/draft/${asset.path.draft_id}` :  `/draft/${asset.path.draft_id}`;
    case Source.Task:
      return asset.path.project_id ? `/projects/${asset.path.project_id}/tasks/${asset.path.task_list_id}/${asset.path.task_id}` : `/tasks/${asset.path.task_list_id}/${asset.path.task_id}`;
    case Source.Event:
      return asset.path.project_id ? `/projects/${asset.path.project_id}/agenda/${asset.path.agenda_id}/${asset.path.event_id}` : `/agenda/${asset.path.agenda_id}/${asset.path.event_id}`;
    default:
      throw new Error("未知的资产类型")
  }
}

interface FromProps {
  notification: Notification;
}
export default function From(props: FromProps) {
  const notification = props.notification;
  return (
    <p className=" text-gray-500 inline-block">
      来自 {sourceToTarget(notification.asset.source)} <Link href={pathToTarget(notification.asset)}><span className="underline">(ID:{" "}
        {pathToTarget(notification.asset)})</span></Link>
    </p>
  );
}
