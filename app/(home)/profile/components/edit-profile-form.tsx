import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Control, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { nanoid } from "nanoid";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteButton } from "./delete-button";
import { DialogClose } from "@radix-ui/react-dialog";
import { StatusGroup } from "./status-group-form";

// 用户数据模型
export type UserData = Omit<User, "id">;
// 定义表单验证模式
const formSchema = z.object({
  avatar: z.union([z.literal(""), z.string().url("请输入正确的URL")]),
  username: z.string().min(1, "用户名不能为空"),
  email: z.string().email().or(z.literal("")),
  status_pool: z
    .object({
      complete: z.object({
        name: z.string(),
        description: z.string(),
      }),
      incomplete: z.array(
        z.object({
          id: z.string(),
          status: z.object({
            name: z.string().min(1, "状态名不能为空"),
            description: z.string(),
          }),
        })
      ),
    })
    .optional(),
});
// 编辑资料表单组件
const EditProfileForm: React.FC<{
  oldData: UserData;
  onSubmit: (newData: UserData) => Promise<void>;
}> = ({ oldData, onSubmit }) => {
  const userId = useUserStore.getState().userId;

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      username: "",
      email: "",
      ...oldData,
    },
  });

  // 表单重置
  useEffect(() => {
    formMethods.reset({
      avatar: "",
      username: "",
      email: "",
      ...oldData,
    });
  }, [oldData]);

  // 添加未完成状态
  function handleAddIncompleteStatus() {
    const oldArray = formMethods.getValues("status_pool.incomplete");
    const newId = userId + nanoid(25);
    const newItem = { id: newId, status: { name: "", description: "" } };
    formMethods.setValue("status_pool.incomplete", [...oldArray, newItem]);
  }

  // 删除未完成状态
  function handleDeleteIncompleteStatus(id: string) {
    const oldArray = formMethods.getValues("status_pool.incomplete");
    formMethods.setValue(
      "status_pool.incomplete",
      oldArray.filter(({ id: status_id }) => status_id !== id)
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          编辑资料
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[75%] overflow-auto">
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>
            在这里更改你的资料. 当你完成修改时请点击保存.
          </DialogDescription>
        </DialogHeader>

        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormField
              control={formMethods.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="avatar" className="text-right">
                    用户头像
                  </FormLabel>
                  <Input
                    id="avatar"
                    placeholder="输入头像URL"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username" className="text-right">
                    用户名
                  </FormLabel>
                  <Input
                    id="username"
                    placeholder="用户名"
                    className="col-span-3"
                    disabled
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-right">
                    邮箱
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="marry123@qq.com"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogHeader className="my-4">
              <DialogTitle>编辑状态池</DialogTitle>
              <DialogDescription>
                状态池包含一个完成状态和多个未完成状态
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={formMethods.control}
              name="status_pool.complete.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="complete-name" className="text-right">
                    完成状态名称
                  </FormLabel>
                  <Input
                    id="complete-name"
                    placeholder="输入完成状态名称"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="status_pool.complete.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="complete-description"
                    className="text-right"
                  >
                    完成状态描述
                  </FormLabel>
                  <Textarea
                    id="complete-description"
                    placeholder="输入完成状态描述"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="status_pool.incomplete"
              render={({ field }) => (
                <FormItem>
                  {field.value.map(
                    (
                      item: {
                        id: string;
                        status: { name: string; description: string };
                      },
                      index: number
                    ) => (
                      <StatusGroup
                        key={index}
                        index={index}
                        id={item.id}
                        control={formMethods.control}
                        handleDeleteIncompleteStatus={
                          handleDeleteIncompleteStatus
                        }
                      />
                    )
                  )}
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={handleAddIncompleteStatus}
              >
                添加未完成态
              </Button>
              <Button
                type="submit"
                asChild
                onClick={async () => {
                  await formMethods.trigger();
                }}
              >
                <DialogClose
                  onClick={e => {
                    if (!formMethods.formState.isValid) {
                      e.preventDefault();
                    }
                  }}
                >
                  保存更改
                </DialogClose>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
