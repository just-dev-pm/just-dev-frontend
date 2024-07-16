"use client";
import { DatePicker, DatePickerProps, Stack } from "rsuite";

/**
 * @description Arrange
 * 1. DatetimePicker
 * 2. ControllerRenderProps
 */
interface DatetimePickerProps extends DatePickerProps {}

/**
 * 时间选择
 * @returns React.FC<>
 */
const DatetimePicker: React.FC<DatetimePickerProps> = props => {
  return (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <DatePicker
        format="yyyy年 MM月 dd日 HH:mm"
        menuClassName="z-50"
        placement="topEnd"
        {...props}
      />
    </Stack>
  );
};

export { DatetimePicker };
