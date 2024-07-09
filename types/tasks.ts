/**
 * 任务列表
 */
export interface TaskList {
  /**
   * ID 编号
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  tasks: Task[];
  [property: string]: any;
}

export interface Task {
  assignees: Assignee[];
  /**
   * ID 编号
   */
  id: string;
  [property: string]: any;
}

export interface Assignee {
  /**
   * ID 编号
   */
  id: string;
  [property: string]: any;
}
