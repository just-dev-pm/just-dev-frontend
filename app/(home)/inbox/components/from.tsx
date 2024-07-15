import { Notification, Source } from "@/types/notification";

type TargetSource = "草稿" | "事件" | "任务";

const sourceToTarget = (source: Source): TargetSource => {
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

interface FromProps {
  notification: Notification;
}
export default function From(props: FromProps) {
  const notification = props.notification;
  return (
    <p className=" text-gray-500 inline-block">
      来自 {sourceToTarget(notification.asset.source)} (ID:{" "}
      {notification.asset.id})
    </p>
  );
}
