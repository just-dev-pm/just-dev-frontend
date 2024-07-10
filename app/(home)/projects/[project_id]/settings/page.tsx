'use client'

import InviteDialog from "../../components/invite-dialog";
import { ISettingsGroup, SettingsGroup } from "../../components/settings-group";

const fakeData1: ISettingsGroup = {
  title: "通用设置",
  settings: [
    { label: "启用通知" },
    { label: "自动保存草稿" },
    { label: "暗黑模式" },
  ],
};

const fakeData2: ISettingsGroup = {
  title: "账户设置",
  settings: [
    { label: "更改密码" },
    { label: "推送通知" },
    { label: "双重验证" },
  ],
};

const fakeData3: ISettingsGroup = {
  title: "隐私设置",
  settings: [
    { label: "数据备份" },
    { label: "位置信息" },
    { label: "广告偏好" },
  ],
};

interface IProps{
  params:{project_id:string};
}

export default function SettingsPage({params}:IProps) {
  const { project_id } = params;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">设置</h1>
      <div className="w-[50%] flex flex-col gap-2 justify-center">
        <SettingsGroup {...fakeData1} />
        <SettingsGroup {...fakeData2} />
        <SettingsGroup {...fakeData3} />
        <InviteDialog project_id={project_id} />
      </div>
    </div>
  );
}
