import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NoStyleInput } from "../../../../components/noStyleInput";
import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export default function RequirementItemCard({
  title,
  description = "请添加事件描述",
}: Props) {
  return (
    title && (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div></div>
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
