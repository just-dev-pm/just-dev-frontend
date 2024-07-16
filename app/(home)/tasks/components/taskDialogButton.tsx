"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddTaskButton from "./taskAddButton";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { BASE_URL } from "@/lib/global";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import useUsersInProject from "@/app/api/project/get-users-in-project";
import usePrs from "@/app/api/get-prs";
import { statusSchema } from "./form/create-task-context";
import {
  PreventOverflowContainer,
  ProjectRender,
  SelectStatus,
  UserRender,
} from "./form/select-status";
import { DatetimeReder } from "./form/datetime-picker";

type Props = {
  message: string;
  members: { id: string }[];
  project: { isProject: boolean; projectId: string };
};

const formSchema = z.object({
  name: z.string().min(1, "任务名不能为空"),
  description: z.string().min(1, "任务描述不能为空"),
  member: z.array(z.string()),
  deadline: z.date({ required_error: "截止时间不能为空" }),
  pr: z.string(),
  status: statusSchema,
});

type Form = z.infer<typeof formSchema>;

//data fetching
const onSubmit = (data: Form) => {
  console.log(data);
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
};

function TaskDialog({ message, members, project }: Props) {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      member: [],
      deadline: new Date(),
      pr: "",
    },
  });
  const project_id = project.projectId;
  const { data: users_data, error: users_error } = useUsersInProject({
    project_id,
  });
  const users = users_data.users;
  const { data: prs_data, error: prs_error } = usePrs({ project_id });
  const prs = prs_data.prs;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus></Plus>新增任务
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <PreventOverflowContainer>
            {getContainer => (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <DialogHeader>
                    <DialogTitle>新增任务</DialogTitle>
                    <DialogDescription>新增一个任务</DialogDescription>
                  </DialogHeader>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>任务名</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="请输入任务名"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>任务描述</FormLabel>
                        <FormControl>
                          <Input
                            id="description"
                            placeholder="请输入任务描述"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  {project.isProject ? (
                    <FormField
                      control={form.control}
                      name="member"
                      render={({}) => (
                        <FormItem className="w-full">
                          <FormLabel>指派给</FormLabel>
                          {users.map(
                            (user: {
                              id: string;
                              username: string;
                              avatar: string;
                            }) => (
                              <FormField
                                key={user.username}
                                control={form.control}
                                name="member"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={user.username}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            user.username
                                          )}
                                          onCheckedChange={checked => {
                                            const newValue = checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  user.username,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    value =>
                                                      value !== user.username
                                                  )
                                                );
                                            console.log(field.value);
                                            return newValue;
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {user.username}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              ></FormField>
                            )
                          )}
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) =>
                      project.isProject ? (
                        <ProjectRender
                          field={field}
                          id={project.projectId}
                          getContainer={getContainer}
                          form={form}
                        />
                      ) : (
                        <UserRender
                          field={field}
                          getContainer={getContainer}
                          form={form}
                        />
                      )
                    }
                  />
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) =>
                      DatetimeReder({ field, getContainer })
                    }
                  />
                  <FormField
                    control={form.control}
                    name="pr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>选择绑定的pr</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择你绑定的pr" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {prs.map((pr: any, index: number) => (
                              <div key={index}>
                                <SelectItem value={pr.title}>
                                  {pr.title}
                                </SelectItem>
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="flex gap-4">
                    <Button type="submit">立即新建</Button>
                    <DialogClose asChild>
                      <Button type="button">退出</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </PreventOverflowContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default TaskDialog;
