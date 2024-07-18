import useProjectAgendaCreate from "@/app/apiTyped/agenda/useProjectAgendaCreate";
import useUserAgendaCreate from "@/app/apiTyped/agenda/useUserAgendaCreate";
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
  className: string;
};

const formSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
});

export default function AgendaSheetDialog({
  project,
  children,
  className,
}: Props) {
  const isProject = project.isProject;
  const userId = useUserStore((stats) => stats.userId);
  const { trigger: userAgendaCreateTrigger } = useUserAgendaCreate(userId, () =>
    mutate(["/api/users/", userId, "/agendas"]),
  );
  const { trigger: projectAgendaCreateTrigger } = useProjectAgendaCreate(
    project.project_id,
    () => mutate(["/api/projects/", project.project_id, "/agendas"]),
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isProject) {
      projectAgendaCreateTrigger({ name: values.name, events: [] });
    } else {
      userAgendaCreateTrigger({ name: values.name, events: [] });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建日程</DialogTitle>
          <DialogDescription>创建一个新日程</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">日程名</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="请输入日程名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <DialogClose
                asChild
                onClick={async (event) => {
                  if (!form.formState.isValid) {
                    event.preventDefault();
                    await form.trigger();
                  }
                }}
              >
                <Button type="submit">保存</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
