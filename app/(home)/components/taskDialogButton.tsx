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

type Props = {
  message: string;
  members: { id: string}[];
};

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  member: z.string(),
});

//data fetching
const onSubmit = (data: {
  name: string;
  description: string;
  member: string;
}) => {
  console.log(data);
  console.log("success!");
};

function TaskDialog({ message, members }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      member: "",
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button><Plus></Plus>新增任务</Button>
        </DialogTrigger>

        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>
                  
                </DialogDescription>
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

              <FormField
                control={form.control}
                name="member"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned to</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            id="members"
                            placeholder="Choose a member"
                            {...field}
                          ></SelectValue>
                        </SelectTrigger>
                        {/* <SelectContent>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent> */}
                      </Select>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-4">
                <Button type="submit">Save</Button>
                <DialogClose asChild>
                  <Button type="button">
                    Delete
                  </Button>
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
