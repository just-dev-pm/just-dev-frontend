//TODO : 删除的路由回退应该只发生在删除成功的情况下

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  participants: { id: string }[];
  handleDelete: () => void;
};

export default function AgendaItemCard({
  title,
  description = "请添加事件描述",
  start_time,
  end_time,
  participants,
  handleDelete,
}: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}{" "}
          <Button>
            <Edit3></Edit3>
          </Button>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Label className="font-bold text-xl">事件描述</Label>
            <Label className="w-full tracking-wider leading-5">
              {description}
            </Label>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="font-bold text-xl ">时间</Label>
            <Label className="w-full tracking-wider leading-5">
              预计于: {start_time} 开始
            </Label>
            <Label className="w-full tracking-wider leading-5">
              预计于: {end_time} 结束
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-6 justify-end">
        <Button
          onClick={() => {
            handleDelete();

            // TODO : 只在DELETE成功时才back

            router.back();
          }}
        >
          删除
        </Button>
        <Button>
          <Link href={`./`}>返回</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
