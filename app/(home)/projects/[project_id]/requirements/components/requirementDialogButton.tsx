import useRequirementCreate from "@/app/api/requirements/create-requirement";
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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "需求名不能为空"),
  content: z.string().min(1, "需求内容不能为空"),
});


export function RequirementDialog({project_id}:{project_id:string}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });
  const {trigger} = useRequirementCreate({project_id})
  const onSubmit = (values:z.infer<typeof formSchema>) => {
    trigger(values)
    mutate(["/api/projects/",{project_id},"/requirements"])
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus></Plus>新增需求
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>新增需求</DialogTitle>
              <DialogDescription>为你的项目新增一个需求</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>需求名</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="请输入需求名"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>需求内容</FormLabel>
                  <FormControl>
                    <Input
                      id="content"
                      placeholder="请输入需求内容"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex gap-4">
              <DialogClose asChild>
                <Button type="submit" onClick={async (event)=>{
                  if(!form.formState.isValid){
                    event.preventDefault()
                    await form.trigger();
                  }
                }}>立即新建</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button">退出</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
