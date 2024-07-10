import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { testBaseUrl } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from 'zod';

const formSchema = z.object({
  avatar:z.string().url(),
  username:z.string(),
  email:z.string().email()
})

export default function EditProfile({ className }: {} & ButtonProps) {
  const url = `/api/users/`;
  const userId = useUserStore((state) => state.userId);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar:"",
      username:"",
      email:"",
    }
  })

  function onSubmit(value: z.infer<typeof formSchema>){

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          编辑资料
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>
            在这里更改你的资料. 当你完成修改时请点击保存.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name='avatar'
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    <Label htmlFor="picture" className="text-right">
                      用户头像
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="avatar"
                      placeholder="Dawn Chan"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='username'
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    <Label htmlFor="username" className="text-right">
                      用户名
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Dawn Chan"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='email'
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    <Label htmlFor="email" className="text-right">
                      邮箱
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="marry@ha.com"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
        <DialogFooter>
          <Button type="submit" onClick={()=>{
            mutate(userId?[url, userId]:null)
          }}>保存更改</Button>
        </DialogFooter>
          </form>
        </Form>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              用户头像
            </Label>
            <Input id="picture" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              用户名
            </Label>
            <Input
              id="username"
              defaultValue="Dawn Chan"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              邮箱
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="marry@ha.com"
              className="col-span-3"
            />
          </div>
        </div> */}

      </DialogContent>
    </Dialog>
  );
}
