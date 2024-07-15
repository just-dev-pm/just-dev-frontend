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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  description: z.string().min(1, "描述不能为空"),
  start_time: z.string().min(1, "开始时间不能为空").datetime(),
  // end_time: z.string().min(1, "结束时间不能为空").datetime(),
  // participants: z.array(z.string()),
});

export default function EventDialog({ project, children, className }: Props) {
  const isProject = project.isProject;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      start_time: "",
      // end_time: "",
      // participants: [],
    },
  });

  function onSubmit() {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建事件</DialogTitle>
          <DialogDescription>创建一个新事件</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">事件名</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="请输入事件名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">事件描述</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      placeholder="请输入事件描述"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="start_time">事件开始时间</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DateTimePicker granularity={"minute"}/>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="end_time">事件结束时间</FormLabel>
                  <FormControl>
                    <DateTimePicker granularity={"minute"}></DateTimePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
