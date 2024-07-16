import { InlineEdit, InlineEditProps, Input } from "rsuite";

interface PureProps extends InlineEditProps {}
export const PureInlineEdit: React.FC<PureProps> = props => (
  <>
    <InlineEdit {...props}>
      <Input as="textarea" rows={5} />
    </InlineEdit>
  </>
);

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PureRender = ({ field }) => (
  <FormItem>
    <FormLabel htmlFor="text">Username</FormLabel>
    <FormControl>
      <Pure {...field} />
    </FormControl>
    <FormDescription>This is your public display name.</FormDescription>
    <FormMessage />
  </FormItem>
);
