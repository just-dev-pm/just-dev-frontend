"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  body: z.string().min(2, { message: "Body must be at least 2 characters." }),
  userId: z.coerce.number().min(1, { message: "User ID must be at least 1." }),
});

const targetUrl = "https://jsonplaceholder.typicode.com/posts";

export default function InputForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const { trigger } = useSWRMutation(
    targetUrl,
    (url, { arg }: { arg: {} }) =>
      fetch(url, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(res => res.json()),
    {
      onSuccess: (data, key, config) => {
        console.log(key, config);
        toast({
          title: "Posted Successfully",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-gray-900 p-4 text-white">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      },
    }
  );

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Form Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-gray-900 p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    trigger(data);
  };
  const userId = form.watch("userId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title" />
                </FormControl>
                <FormDescription>
                  This is the title of your submission.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter body"
                    className="resize-none w-full p-2 border border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormDescription>
                  This is the main content of your submission.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={userId ?? ""}
                    type="number"
                    placeholder="Enter User ID"
                  />
                </FormControl>
                <FormDescription>
                  This is the ID of the user making the submission.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
