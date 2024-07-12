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
import { Button, ButtonProps } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { nanoid } from "nanoid";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  CreateProjectFormSchema,
  createProjectFormSchema,
} from "@/types/project/create-project-form";
import { DeleteButton } from "../../profile/components/delete-button";
import { preventDefault } from "tldraw";

// 编辑资料表单组件
const CreateProjectForm: React.FC<
  {
    onSubmit: (newData: CreateProjectFormSchema) => Promise<void>;
  } & Omit<ButtonProps, "onSubmit">
> = ({ onSubmit, ...props }) => {
  const formMethods = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      avatar: "",
      status_pool: {
        complete: {},
        incomplete: [],
      },
    },
  });

  // 添加未完成状态
  function handleAddIncompleteStatus() {
    const oldArray = formMethods.getValues("status_pool.incomplete");
    const newId = nanoid(30);
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
        <Button variant="outline" className="ml-auto" {...props}>
          新建项目
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[75%] overflow-auto">
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>
            在这里编辑项目资料. 当你完成修改时请点击保存.
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
                    项目头像
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-right">
                    项目名称
                  </FormLabel>
                  <Input
                    id="username"
                    placeholder="项目名称"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="text-right">
                    项目描述
                  </FormLabel>
                  <Textarea
                    id="description"
                    placeholder="本项目..."
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
                        status={item.status}
                        handleDeleteIncompleteStatus={
                          handleDeleteIncompleteStatus
                        }
                        onChangeName={e => {
                          const newItems = [...field.value];
                          newItems[index].status.name = e.target.value;
                          formMethods.setValue(
                            "status_pool.incomplete",
                            newItems
                          );
                        }}
                        onChangeDescription={e => {
                          const newItems = [...field.value];
                          newItems[index].status.description = e.target.value;
                          formMethods.setValue(
                            "status_pool.incomplete",
                            newItems
                          );
                        }}
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
              <Button type="submit" asChild>
                <DialogClose onClick={e => preventDefault(e)}>
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

// 未完成状态组件
const StatusGroup: React.FC<{
  index: number;
  id: string;
  status: { name: string; description: string };
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDeleteIncompleteStatus: (id: string) => void;
}> = ({
  index,
  id,
  status,
  onChangeName,
  onChangeDescription,
  handleDeleteIncompleteStatus,
}) => (
  <div>
    <FormLabel htmlFor={`incomplete-${index}`} className="text-right">
      未完成状态 {index + 1}
      <DeleteButton onClick={() => handleDeleteIncompleteStatus(id)} />
    </FormLabel>
    <Input
      id={`incomplete-${index}`}
      placeholder={`状态名`}
      className="col-span-3"
      value={status.name}
      onChange={onChangeName}
    />
    <FormMessage />
    <FormLabel
      htmlFor={`incomplete-description-${index}`}
      className="text-right"
    >
      描述
    </FormLabel>
    <Textarea
      id={`incomplete-description-${index}`}
      placeholder={`描述`}
      className="col-span-3"
      value={status.description}
      onChange={onChangeDescription}
    />
    <FormMessage />
  </div>
);

export default CreateProjectForm;
