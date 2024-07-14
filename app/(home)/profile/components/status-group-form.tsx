// 渲染: shadcn
// 逻辑: react-hook-form
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeleteButton } from "./delete-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export // 未完成状态组件
const StatusGroup: React.FC<{
  index: number;
  id: string;
  control: any;
  handleDeleteIncompleteStatus: (id: string) => void;
}> = ({ index, id, control, handleDeleteIncompleteStatus }) => (
  <div>
    <FormField
      control={control}
      name={`status_pool.incomplete.${index}.status.name`}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={`incomplete-${index}`} className="text-right">
            未完成状态 {index + 1}
            <DeleteButton onClick={() => handleDeleteIncompleteStatus(id)} />
          </FormLabel>
          <Input
            id={`incomplete-${index}`}
            placeholder={`状态名`}
            className="col-span-3"
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`status_pool.incomplete.${index}.status.description`}
      render={({ field }) => (
        <FormItem>
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
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
