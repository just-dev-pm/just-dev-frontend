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
import AddTaskButton from "../../components/taskAddButton";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { BASE_URL } from "@/lib/global";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multi-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast"


type Props = {
  message: string;
  members: { id: string }[];
  project:{isProject:boolean,projectId:string}
};

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  member: z.array(z.string()).nonempty("Please select at least one person"),
});

type Form = z.infer<typeof formSchema>


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
  })
};

function TaskDialog({ message, members, project }: Props) {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: "",
      description: "",
      member: [],
    },
  })
  const project_id = project.projectId
  const urlPrefix = `/api/projects/`
  const urlSuffix = `/users`
  const {data,error} = useSWR(
    project_id ? [urlPrefix,project_id,urlSuffix] : null,
    ([urlPrefix,project_id,urlSuffix]) =>
      fetch(BASE_URL+ urlPrefix+project_id+urlSuffix,{
        credentials:"include",
      }).then((res)=>{
        if(!res.ok){
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
      {suspense:true}
  );
  const users = data.users


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus></Plus>新增任务
          </Button>
        </DialogTrigger>

        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogHeader>
                <DialogTitle>Task</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Input the task name"
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="Input the task description"
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
                  render={({ }) => (
                    <FormItem className="w-full">
                      <FormLabel>Assigned to</FormLabel>
                        {users.map((user:{id:string,username:string,avatar:string})=>(
                          <FormField key={user.username} control={form.control} name="member" render={({field})=>{
                            return (
                              <FormItem key={user.username} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value?.includes(user.username)}
                                    onCheckedChange={(checked)=>{
                                      const newValue =  checked ? field.onChange([...field.value,user.username])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value)=> value !== user.username
                                        )
                                      )
                                      console.log(field.value);
                                      return newValue
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {user.username}
                                </FormLabel>
                              </FormItem>
                            )
                          }}></FormField>
                        ))}
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              ) : (
                <></>
              )}

              <DialogFooter className="flex gap-4">
                <Button type="submit">Save</Button>
                <DialogClose asChild>
                  <Button type="button">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default TaskDialog;
