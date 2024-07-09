import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NoStyleInput } from "./noStyleInput";
import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  time: string;
  place: string;
};

export default function AgendaItemCard({
  title,
  description="请添加事件描述",
  time,
  place
}: Props) {
  const [isAbleToEdit, setAbleTOEdit] = useState(false);
  return (
    title &&
    time &&
    place && (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {title}{" "}
            <Button onClick={() => setAbleTOEdit(!isAbleToEdit)}>
              <Edit3></Edit3>
            </Button>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <Label>事件描述</Label>
              <NoStyleInput
                className="w-full"
                disabled={!isAbleToEdit}
                placeholder={description}
              ></NoStyleInput>
            </div>
            <div>
              <Label>时间</Label>
              <NoStyleInput
                className="w-full"
                disabled={!isAbleToEdit}
                placeholder={time}
              ></NoStyleInput>
            </div>
            <div>
              <Label>地点</Label>
              <NoStyleInput
                className="w-full"
                disabled={!isAbleToEdit}
                placeholder={place}
              ></NoStyleInput>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-6 justify-end">
          <Button>保存</Button>
          <Button><Link href={`./`}>返回</Link></Button>
        </CardFooter>
      </Card>
    )
  );
}
