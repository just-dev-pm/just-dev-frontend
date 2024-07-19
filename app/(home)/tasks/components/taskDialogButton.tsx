"use client";

import usePrs from "@/app/api/get-prs";
import useUsersInProject from "@/app/api/project/get-users-in-project";
import useTaskCreate from "@/app/api/task/create-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";
import { statusSchema } from "./form/create-task-context";
import { DatetimeReder } from "./form/datetime-picker";
import {
  PreventOverflowContainer,
  ProjectRender,
  UserRender,
} from "./form/select-status";

type Props = {
  message: string;
  members: { id: string }[];
  project: { isProject: boolean; projectId: string };
  task_list_id: string;
};

const formSchema = z.object({
  name: z.string().min(1, "任务名不能为空"),
  description: z.string().min(1, "任务描述不能为空"),
  assignees: z.array(z.object({ id: z.string() })),
  deadline: z.date({ required_error: "截止时间不能为空" }),
  pr: z
    .object({
      owner: z.string(),
      repo: z.string(),
      pull_number: z.number(),
      title: z.string(),
    })
    .optional(),
  status: statusSchema,
});

type Form = z.infer<typeof formSchema>;

//data fetching

function TaskDialog({ message, members, project, task_list_id }: Props) {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      assignees: [],
      deadline: new Date(),
    },
  });
  const project_id = project.projectId;
  const {
    data: users_data,
    error: users_error,
    isLoading: users_loading,
  } = useUsersInProject({
    project_id,
  });
  const {
    data: prs_data,
    error: prs_error,
    isLoading: prs_loading,
  } = usePrs({ project_id });
  const prs = prs_data.prs;
  const { trigger } = useTaskCreate({ task_list_id });

  if (project.isProject && (prs_loading || !users_data || users_loading))
    return <Loading />;
  console.log("$$", users_data);
  const users = users_data?.users;

  const onSubmit = async (data: Form) => {
    if (data.pr === undefined) {
      const sendData = {
        name: data.name,
        description: data.description,
        assignees: data.assignees,
        deadline: data.deadline,
        status: data.status,
      };
      await trigger(sendData);
    } else {
      await trigger(data);
    }
    mutate(["/api/task_lists/", task_list_id, "/tasks"]);
    console.log("data!", data);
  };

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
            {(getContainer) => (
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
                      name="assignees"
                      render={({ }) => (
                        <FormItem className="w-full">
                          <FormLabel>指派给</FormLabel>
                          {users.map(
                            (user: {
                              id: string;
                              username: string;
                            }) => (
                              <FormField
                                key={user.username}
                                control={form.control}
                                name="assignees"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={user.username}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.some(
                                            (value) => value.id === user.id,
                                          )}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? field.onChange([
                                                ...(field.value ?? []),
                                                { id: user.id },
                                              ])
                                              : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value.id !== user.id,
                                                ),
                                              );
                                            console.log(newValue);
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
                            ),
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
                  {project.isProject && (
                    <FormField
                      control={form.control}
                      name="pr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>选择绑定的pr</FormLabel>
                          <Select
                            onValueChange={(v) => {
                              const parts = v.split("-");
                              const pull_number = parseInt(parts[2]);
                              form.setValue("pr.owner", parts[0]);
                              form.setValue("pr.repo", parts[1]);
                              form.setValue("pr.pull_number", pull_number);
                              form.setValue("pr.title", parts[3]);
                              console.log(parts);
                              console.log(form.getValues());
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择你绑定的pr" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {prs.map((pr: any, index: number) => (
                                <div key={index}>
                                  <SelectItem
                                    value={
                                      pr.owner +
                                      "-" +
                                      pr.repo +
                                      "-" +
                                      pr.pull_number +
                                      "-" +
                                      pr.title
                                    }
                                  >
                                    {pr.owner +
                                      "-" +
                                      pr.repo +
                                      "-" +
                                      pr.pull_number +
                                      "-" +
                                      pr.title}
                                  </SelectItem>
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage></FormMessage>
                        </FormItem>
                      )}
                    />
                  )}
                  <DialogFooter className="flex gap-4">
                    <DialogClose asChild>
                      <Button type="submit" onClick={async (event) => {
                        if (!form.formState.isValid) {
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
            )}
          </PreventOverflowContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default TaskDialog;
