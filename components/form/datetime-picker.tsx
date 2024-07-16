"use client";
import { DatePicker, Stack } from "rsuite";

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
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

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
