"use client";
import { DatePicker, Stack } from "rsuite";
import { CalendarIcon } from "lucide-react";

const Pure = props => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <DatePicker
      format="MM/dd/yyyy HH:mm"
      {...props.field}
      menuClassName="z-50"
      container={props.getContainer}
      placement="topEnd"
    />
  </Stack>
);

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment-timezone";

const formSchema = z.object({
  username: z.date().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

const data = Array.from({ length: 10000 }).map((_, index) => {
  return {
    label: `Item ${index}`,
    value: `Item ${index}`,
  };
});

/*
export function ControlDate() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: new Date(),
    },
  });

  function onSubmit(data: FormSchema) {
    console.log(data.username);
    const iso = data.username?.toISOString();
    console.log(iso);

    const date = moment(data.username, "YYYY-MM-DDThh:mm:ss[.mmm]TZD").toDate();
    console.log(date);
  }

  function handleChange(field: any, newValue: Date) {
    field.onChange(
      moment(newValue, "YYYY-MM-DDThh:mm:ss[.mmm]TZD").toISOString()
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField control={form.control} name="username" render={} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
*/

export const DatetimeReder = ({ field, getContainer }) => (
  <FormItem>
    <FormLabel htmlFor="deadline">截止时间</FormLabel>
    <FormControl>
      <Pure {...field} getContainer={getContainer} />
    </FormControl>
    <FormDescription>任务应当在截止时间之前标记完成</FormDescription>
    <FormMessage />
  </FormItem>
);
