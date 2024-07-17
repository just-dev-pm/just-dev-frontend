"use client";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <div className="flex items-center z-50 gap-4" key={task.id}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StatusFormField />
        </form>
      </Form>
      <div className="w-full px-2">
        <Link href={`${path}/${task.id}`}>{task.name}</Link>
      </div>
    </div>
  );
}
