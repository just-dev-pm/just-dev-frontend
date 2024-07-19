"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InlineEdit, TagPicker } from "rsuite";
import { useAddEventContext } from "./context";

/**
 * @description Arrange
 * 1. FormField
 */
// type FormItemProps = ControllerRenderProps<,>

interface FormFieldProps {
  data: { label: string; value: string }[];
}
const AssigneesFormField: React.FC<FormFieldProps> = ({ data }) => {
  const context = useAddEventContext();

  if (!context) {
    throw new Error("未包裹 ChangeTaskContextProvider");
  }

  const { form, onSubmit } = context;

  return (
    <FormField
      control={form.control}
      name="participants"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-4 justify-center">
          <FormLabel htmlFor="asignees">分配给</FormLabel>
          <FormControl>
            <InlineEdit
              placeholder="请选择"
              showControls={false}
              value={(form.getValues("participants") || []).map(
                ({ id }: { id: string }) => id,
              )}
              onChange={(ids: string[]) => {
                form.setValue(
                  "participants",
                  ids.map((id) => ({ id })),
                );
              }}
            >
              <TagPicker
                defaultValue={[]}
                data={data}
                block
                menuClassName="z-50"
              />
            </InlineEdit>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { AssigneesFormField };
