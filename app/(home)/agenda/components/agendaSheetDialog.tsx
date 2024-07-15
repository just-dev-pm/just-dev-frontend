import useProjectAgendaCreate from "@/app/api/agenda/create-project-agenda";
import useUserAgendaCreate from "@/app/api/agenda/create-user-agenda";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

export default function AgendaSheetDialog({ project, children,className }: Props) {
  const isProject = project.isProject;
  const userId = useUserStore((stats) => stats.userId);
  const { trigger: userAgendaCreateTrigger } = useUserAgendaCreate({
    user_id: userId,
  });
  const { trigger: projectAgendaCreateTrigger } = useProjectAgendaCreate({
    project_id: project.project_id,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name:""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>){
    if(isProject){
        projectAgendaCreateTrigger({name: values.name,events:[]});
        mutate(["/api/projects/",project.project_id,"/agendas"])
    }else{
        userAgendaCreateTrigger({name:values.name,events:[]});
        mutate(["/api/users/",userId,"/agendas"])
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
              <Button
                asChild
                type="submit"
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
