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
import { Input, InputProps } from "@/components/ui/input";
import { Button, ButtonProps } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Incomplete, StatusItem, User } from "@/types/user";
import { FilterUndefined } from "@/lib/type";

export type UserData = Omit<User, "id">;

interface EditProfileFormProps {
  oldData: UserData;
  onSubmit: (newData: UserData) => void;
}

/**
 * status_item Schema
 */
const statusItemSchema = z.object({
  description: z.string(),
  name: z.string(),
});

/**
 * incomplete Schema
 */
const incompleteSchema = z.object({
  id: z.string(),
  status: statusItemSchema,
});

/**
 * status_pool Schema
 */
const statusPoolSchema = z.object({
  complete: statusItemSchema,
  incomplete: z.array(incompleteSchema),
});

const formSchema = z.object({
  avatar: z.string().url(),
  username: z.string(),
  email: z.string().email(),
  status_pool: statusPoolSchema.optional(),
});

const EditProfileForm: React.FC<
  EditProfileFormProps & Omit<ButtonProps, "onSubmit">
> = ({ oldData, onSubmit, ...props }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: oldData,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" {...props}>
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
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                    {...field}
                  />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                  <FormMessage>
                    {
                      form.formState.errors?.status_pool?.complete?.name
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_pool.complete.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="complete-description"
                    className="text-right"
                  >
                    完成状态描述
                  </FormLabel>
                  <Input
                    id="complete-description"
                    placeholder="输入完成状态描述"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage>
                    {
                      form.formState.errors?.status_pool?.complete?.description
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_pool.incomplete"
              render={({ field }) => (
                <FormItem>
                  {field.value.map((item: Incomplete, index: number) => (
                    <div key={index}>
                      <StatusGroup
                        label="incomplete"
                        labelName="未完成状态"
                        index={index}
                        status={item.status}
                        onChangeName={e => {
                          const newItems = [...field.value];
                          newItems[index].status.name = e.target.value;
                          form.setValue("status_pool.incomplete", newItems);
                        }}
                        onChangeDescription={e => {
                          const newItems = [...field.value];
                          newItems[index].status.description = e.target.value;
                          form.setValue("status_pool.incomplete", newItems);
                        }}
                      />
                    </div>
                  ))}
                </FormItem>
              )}
            />
            <DialogFooter className="my-4">
              <Button type="submit">保存更改</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type OnChange = (
  e: Parameters<FilterUndefined<InputProps["onChange"]>>[0]
) => void;
interface StatusGroupProps {
  label: string;
  labelName: string;
  index: number;
  status: StatusItem;
  onChangeName: OnChange;
  onChangeDescription: OnChange;
}
export function StatusGroup({
  label,
  labelName,
  index,
  status,
  onChangeName,
  onChangeDescription,
}: StatusGroupProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <FormLabel htmlFor={label} className="text-right">
          {labelName}
        </FormLabel>
        <Input
          id={`incomplete-${index}`}
          placeholder={`${labelName} ${index + 1}`}
          className="col-span-3"
          value={status.name}
          onChange={onChangeName}
        />
        <FormMessage />
      </div>
      <div>
        <FormLabel htmlFor={label} className="text-right">
          描述
        </FormLabel>
        <Input
          id={`${label}-${index}`}
          placeholder={`${labelName}描述 ${index + 1}`}
          className="col-span-3"
          value={status.description}
          onChange={onChangeDescription}
        />
        <FormMessage />
      </div>
    </div>
  );
}

export default EditProfileForm;
