"use client";
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
            <DialogFooter className="mt-4">
              <Button
                asChild
                type="submit"
                onClick={async event => {
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
