"use client";

import { useProjectDraftCreate } from "@/app/api/draft/create-project-draft";
import { useUserDraftCreate } from "@/app/api/draft/create-user-draft";
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
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

type Props = {
  project: {
    isProject: boolean;
    project_id: string;
  };
  children: React.ReactNode;
};

const formSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
});

export function DraftsDialog({ project, children }: Props) {
  const isProject = project.isProject;
  const userId = useUserStore((stats) => stats.userId);
  const { trigger: userDraftCreateTrigger } = useUserDraftCreate({
    user_id: userId,
  });
  const { trigger: projectDraftCreateTrigger } = useProjectDraftCreate({
    project_id: project.project_id,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isProject) {
      projectDraftCreateTrigger({ name: values.name });
      mutate(["/api/projects/", project.project_id, "/drafts"]);
    } else {
      userDraftCreateTrigger({ name: values.name });
      mutate(["/api/users/", userId, "/drafts"]);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新增草稿</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>创建一个新草稿</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">草稿名</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="请输入草稿名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                asChild
                type="submit"
                onClick={async () => {
                  await form.trigger();
                }}
              >
                <DialogClose
                  onClick={(event) => {
                    if (!form.formState.isValid) {
                      event.preventDefault();
                    }
                  }}
                >
                  保存
                </DialogClose>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
