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
  
  type Props = {
    title: string;
    description: string;
    ddl: string;
    collaborators: string[];
  };
  
  export default function TaskItemCard({
    title,
    description="请添加事件描述",
    ddl,
    collaborators=[]
  }: Props) {
    const [isAbleToEdit, setAbleTOEdit] = useState(false);
    return (
      title &&
      ddl &&
      (
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
                <Label>协作者</Label>
                <NoStyleInput
                  className="w-full"
                  disabled={!isAbleToEdit}
                  placeholder={collaborators.join(",")}
                ></NoStyleInput>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-6 justify-end">
            <Button>保存</Button>
            <Button>返回</Button>
          </CardFooter>
        </Card>
      )
    );
  }
  