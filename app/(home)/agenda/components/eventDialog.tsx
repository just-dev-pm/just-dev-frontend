"use client";
import useUsersInProject, {
  User,
} from "@/app/api/project/get-users-in-project";
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
import { Form } from "@/components/ui/form";
import { Loader } from "rsuite";
import { AssigneesFormField } from "./add-event/asignees";
import { useAddEventContext } from "./add-event/context";
import { EndTimeFormField } from "./add-event/end-time";
import { EventDescriptionFormField } from "./add-event/event-description";
import { EventNameFormField } from "./add-event/event-name";
import { StartTimeFormField } from "./add-event/start-time";

type Props = {
  project: {
    isProject: boolean;
    project_id: string;
  };
  children: React.ReactNode;
  className: string;
};

export default function EventDialog({ project, children, className }: Props) {
  const isProject = project.isProject;
  const { form, onSubmit } = useAddEventContext();
  const { data, isLoading } = useUsersInProject({
    project_id: project.project_id,
  });

  if (isLoading) return <Loader />;

  /**
   * 将 User[] 转换为 { label: string, value: string }[]
   * @param users User[] 用户数组
   * @returns { label: string, value: string }[] 转换后的数组
   */
  const convertUsersToOptions = (
    users: User[],
  ): { label: string; value: string }[] => {
    if (!users || users.length === 0) return [];
    return users.map((user) => ({
      label: user.username,
      value: user.id,
    }));
  };

  console.log("是否项目", project, data);
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
            <EventNameFormField />
            <EventDescriptionFormField />
            <StartTimeFormField />
            <EndTimeFormField />
            {project.isProject && (
              <div className="mt-4">
                <AssigneesFormField data={convertUsersToOptions(data.users)} />
              </div>
            )}
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
