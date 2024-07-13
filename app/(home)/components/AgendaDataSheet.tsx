import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

type calendars = {
  id: string;
  name: string;
}[];

export default function AgendaDataSheeet({
  calendars,
}: {
  calendars: calendars;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Show More Calendar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>Calendar</SheetHeader>
        <SheetDescription>choose canlendar and view details</SheetDescription>

        <div className="flex flex-col gap-6 mt-5">
          {calendars.map((calendar, index) => (
            <div className="flex justify-between items-center" key={index}>
              <Label>
                <Link href={`./agenda/${calendar.id}`}>{calendar.name}</Link>
              </Label>
              <Switch></Switch>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose>
            <Button className="mt-5">确定</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
