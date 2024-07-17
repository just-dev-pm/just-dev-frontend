import useProjectTasklistCreate from "@/app/api/tasklist/create-project-tasklist";
import useUserTasklistCreate from "@/app/api/tasklist/create-user-tasklist";
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

export function TasklistDialog({ project, children }: Props) {
  const isProject = project.isProject;
  const userId = useUserStore((stats) => stats.userId);
  const { trigger: userDraftCreateTrigger } = useUserTasklistCreate({
    user_id: userId,
  });
  const { trigger: projectDraftCreateTrigger } = useProjectTasklistCreate({
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
      mutate(["/api/projects/", project.project_id, "/task_lists"]);
    } else {
      userDraftCreateTrigger({ name: values.name });
      mutate(["/api/users/", userId, "/task_lists"]);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建任务列表</DialogTitle>
          <DialogDescription>创建一个任务列表</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">任务列表名</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="请输入任务列表名"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                asChild
                onClick={async (event) => {
                  if (!form.formState.isValid) {
                    event.preventDefault();
                    await form.trigger();
                  }
                }}
              >
                <DialogClose>保存</DialogClose>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
