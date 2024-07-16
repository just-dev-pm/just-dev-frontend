import { StatusPool } from "@/types/user";

const ExtractStatus = (statusPool: StatusPool) => {
  const { incomplete, complete } = statusPool;

  // 将不完整状态的数组转换成适合 SelectPicker 使用的格式
  const incompleteOptions = incomplete.map(item => ({
    label: item.status.name,
    value: item.id,
    tag: "incomplete",
    description: item.status.description,
  }));

  // 完成状态的选项
  const completeOption = {
    label: complete.name,
    value: "complete",
    tag: "complete",
    description: complete.description,
  };

  // 所有状态选项
  const options = [completeOption, ...incompleteOptions];
  return options;
};

export { ExtractStatus };
