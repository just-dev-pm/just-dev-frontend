"use client";

import { useDraftChange } from "@/app/api/draft/change-draft";
import { useProjectDraftCreate } from "@/app/api/draft/create-project-draft";
import { useUserDraftCreate } from "@/app/api/draft/create-user-draft";
import useDraft from "@/app/api/draft/get-draft";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

type Props = {
  draft_id: string;
  oldData: FormSchema;
};

const formSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChangeDraftForm({ draft_id, oldData }: Props) {
  const { trigger } = useDraftChange({
    draft_id: draft_id,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: oldData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    trigger(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit2Icon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>修改草稿</DialogTitle>
          <DialogDescription>修改草稿信息</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">新草稿名</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="请输入新草稿名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                asChild
                onClick={async e => {
                  if (!form.formState.isValid) e.preventDefault();
                  await form.trigger();
                }}
              >
                <DialogClose>保存更改</DialogClose>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
