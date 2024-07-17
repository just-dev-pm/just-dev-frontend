"use client";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider } from "rsuite";
import { useChangeStatusContext } from "./context";
import { StatusFormField } from "./status";
import { Task } from "./task";

export default function TaskItem({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  const path = usePathname();
  const { form, onSubmit } = useChangeStatusContext();
  return (
    <div
      className="grid grid-cols-[1fr_3fr] items-center z-50 gap-4"
      key={task.id}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StatusFormField />
        </form>
      </Form>
      <Divider vertical />
      <div className="w-full text-primary px-2">
        <Link href={`${path}/${task.id}`}>{task.name}</Link>
      </div>
    </div>
  );
}
