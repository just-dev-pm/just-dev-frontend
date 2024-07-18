"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderKanbanIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";
import { useUserIn } from "@/app/api/useUserIn";
// import { useToast } from '@/components/ui/use-toast'

interface Props {}

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function LoginPage(props: Props) {
  const { error, trigger } = useUserIn("/api/auth/login");
  // const {toast} = useToast()
  const {} = props;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: {
    username: string;
    password: string;
  }) => {
    console.log(formData);
    await trigger(formData);
    if (!error) router.push(`dashboard`);
    else console.log(error);
  };

  return (
    <>
      error ? <div>{JSON.stringify(error)}</div> :
      <FolderKanbanIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>登录</CardTitle>
          <CardDescription>登录你的 Just Dev 账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="用户名" {...field} />
                    </FormControl>
                    <FormDescription>
                      这是你已在 Just Dev 注册的用户名.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">登录</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>还没有账户?</small>
          <Button asChild variant={"outline"} size="sm">
            <Link href="/signup">注册</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default LoginPage;
