import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface Setting {
  label: string;
}
export interface ISettingsGroup {
  title: string;
  settings: Setting[];
}
export function SettingsGroup({ title, settings }: ISettingsGroup) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {settings.map((setting, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <Label htmlFor={`setting-${index}`}>{setting.label}</Label>
            <Switch id={`setting-${index}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
