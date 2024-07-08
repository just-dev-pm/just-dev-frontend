"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface JoinSuccessData {
  member: string;
  project: string;
}

export default function JoinSuccessView({ data }: { data: JoinSuccessData }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      // 在这里添加跳转到项目页面的逻辑
      console.log("跳转到项目页面");
    }
  }, [countdown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
      <Card>
        <CardHeader>
          <CardTitle>加入成功</CardTitle>
          <CardDescription>欢迎 {data.member}</CardDescription>
        </CardHeader>
        <CardContent>
          您已成功加入 {data.project} 项目。
          <p className="mt-4">{countdown} 秒后自动跳转到项目页面...</p>
        </CardContent>
        <CardFooter>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-85 hover:text-opacity-85 transition">
            立即进入项目
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
