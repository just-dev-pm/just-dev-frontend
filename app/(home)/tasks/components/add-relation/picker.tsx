import { PropsWithChildren } from "react";
import { Radio, RadioGroup, RadioGroupProps } from "rsuite";

const RadioLabel: React.FC<PropsWithChildren> = ({ children }) => (
  <label style={{ padding: 7 }}>{children}</label>
);

interface PickerProps extends RadioGroupProps {}
const Picker: React.FC<PickerProps> = props => (
  <>
    <RadioGroup
      name="radio-group-inline-picker"
      inline
      appearance="picker"
      defaultValue="A"
      {...props}
    >
      <RadioLabel>关联方向: </RadioLabel>
      <Radio value="A">前置任务</Radio>
      <Radio value="B">后置任务</Radio>
    </RadioGroup>
  </>
);

export { Picker as RelationTypePicker };
