import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import AgendaSheetDialog from "./agendaSheetDialog";
import useAgendaDelete from "@/app/api/agenda/delete-agenda";
import { mutate } from "swr";
import { useUserStore } from "@/store/userStore";
import useUserAgenda from "@/app/api/agenda/get-user-agenda";
import useProjectAgenda from "@/app/api/agenda/get-project-agenda";
import { Dispatch, SetStateAction } from "react";

type calendars = {
  id: string;
  name: string;
}[];

export default function AgendaDataSheeet({
  calendars,
  project,
  switchState,
  setSwitchState,
  setCalendars
}: {
  calendars: calendars;
  project: { isProject: boolean; project_id: string };
  switchState: {
    id: string;
    checked: boolean;
  }[];

  setSwitchState: Dispatch<
    SetStateAction<
      {
        id: string;
        checked: boolean;
      }[]
    >
  >;
  setCalendars: Dispatch<SetStateAction<{
    id: string;
    name: string;
}[]>>
}) {
  const useId = useUserStore((stats) => stats.userId);
  // const {mutate} = useUserAgenda({user_id:useId})
  const { mutate: user_mutate } = useUserAgenda({ user_id: useId });
  const { mutate: project_mutate } = useProjectAgenda({
    project_id: project.project_id,
  });
  const { trigger } = useAgendaDelete();
  function onDelete(agenda_id: string) {
    setCalendars((pre) => [...pre.filter((stats)=> stats.id !== agenda_id)]);
    setSwitchState((prevStates) => [
      ...prevStates.filter((state_now) => state_now.id !== agenda_id)]);
    project.isProject
      ? trigger(agenda_id)
      : trigger(agenda_id)
  }

  const getSwitchState = (id: string) =>
    switchState.find((state) => state.id === id);

  function onSwitchChange(
    state: {
      id: string;
      checked: boolean;
    },
    isChecked: boolean
  ) {
    console.log(switchState);
    setSwitchState((prevStates) => [
      ...prevStates.filter((state_now) => state_now !== state),
      { id: state.id, checked: isChecked },
    ]);
    console.log(switchState);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>查看我的日程</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>日程表总览</SheetTitle>
        </SheetHeader>
        <SheetDescription>选择你专注的日程</SheetDescription>
        <div className="flex flex-col gap-6 mt-5">
          {calendars &&
            calendars.map((calendar, index) => {
              const switchState = getSwitchState(calendar.id);
              return (
                <div className="flex justify-between items-center" key={index}>
                  <Label>
                    <Link href={`./agenda/${calendar.id}`}>
                      {calendar.name}
                    </Link>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={switchState?.checked}
                      onClick={() =>
                        onSwitchChange(switchState!, !switchState?.checked)
                      }
                    ></Switch>
                    <Button
                      variant="ghost"
                      className="px-2"
                      onClick={() => onDelete(calendar.id)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
        <AgendaSheetDialog className="mt-5 w-full" project={project}>
          <Plus></Plus>新增日程
        </AgendaSheetDialog>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="mt-5">确定</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
