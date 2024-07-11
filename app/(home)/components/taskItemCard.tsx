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
import { useUserInfo } from "@/app/api/useUserInfo";

type Props = {
  title: string;
  description: string;
  ddl: string;
  collaborators: string[];
  isProject: boolean;
};

export default function TaskItemCard({
  title,
  description = "请添加事件描述",
  ddl,
  collaborators = [],
  isProject,
}: Props) {
  const [isAbleToEdit, setAbleTOEdit] = useState(false);
  let names: string[] = [];
  collaborators.map((c_user_id) => {
    const { data } = useUserInfo({ userId: c_user_id });
    names.push(data.username);
  });

  return (
    title &&
    ddl && (
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
              <Label>任务描述</Label>
              <NoStyleInput
                className="w-full"
                disabled={!isAbleToEdit}
                placeholder={description}
              ></NoStyleInput>
            </div>
            <div>
              <Label>截止日期</Label>
              <NoStyleInput
                className="w-full"
                disabled={!isAbleToEdit}
                placeholder={ddl}
              ></NoStyleInput>
            </div>
            <div>
              {isProject && (
                <>
                  <Label>协作者</Label>
                  <NoStyleInput
                    className="w-full"
                    disabled={!isAbleToEdit}
                    placeholder={names.join(",")}
                  ></NoStyleInput>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-6 justify-end">
          <Button>保存</Button>
          <Button>
            <Link href={`./`}>返回</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  );
}
