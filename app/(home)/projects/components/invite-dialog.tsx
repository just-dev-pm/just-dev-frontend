"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL, CLIENT_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const formSchema = z.object({
  invitee_id: z.string(),
});

type Data = {
  invitor_id: string;
  invitee_id: string;
  project_id: string;
};

export default function InviteDialog({ project_id }: { project_id: string }) {
  const { toast } = useToast();
  const invitor_id = useUserStore((stats) => stats.userId);
  const url = `/api/invitation/generate`;
  const fetcher = (url: string, { arg }: { arg: Data }) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(arg),
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error! status:" + res.status);
      }
      return res.json();
    });
  const { trigger } = useSWRMutation(`${BASE_URL}${url}`, fetcher, {
    onSuccess: (data) => {
      // console.log(data);
      toast({
        title: "",
        description: JSON.stringify(data.invitation_token),
        action: (
          <CopyToClipboard
            text={CLIENT_URL + "/invite/" + data.invitation_token}
            onCopy={() => {
              toast({
                title: `成功复制邀请链接`,
                description: CLIENT_URL + "/invite/" + data.invitation_token,
              });
            }}
          >
            <Button>复制</Button>
          </CopyToClipboard>
        ),
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitee_id: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const invitee_id = value.invitee_id;
    await trigger({ invitor_id, invitee_id, project_id });
    // if(!data) return <div>loading...</div>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus></Plus>邀请
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>邀请其他成员</DialogTitle>
          <DialogDescription>邀请其他成员加入你的项目</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="invitee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邀请</FormLabel>
                  <Input placeholder="输入对方的ID" {...field}></Input>
                  <FormDescription>邀请对方进入你的项目</FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">邀请</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
