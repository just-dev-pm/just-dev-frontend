/**
 * 任务
 */
export interface Task {
  assignees: Assignee[];
  /**
   * 截止时间
   */
  deadline: string;
  /**
   * 简介
   */
  description: string;
  /**
   * ID 编号
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * GitHub PR
   */
  pr?: Pr;
  /**
   * 状态
   */
  status: Status;
  [property: string]: any;
}

export interface Assignee {
  /**
   * ID 编号
   */
  id: string;
  [property: string]: any;
}

/**
 * GitHub PR
 */
export interface Pr {
  owner: string;
  pull_number: number;
  repo: string;
  [property: string]: any;
}

/**
 * 状态
 */
export interface Status {
  /**
   * 分组
   */
  category: Category;
  /**
   * ID 编号
   */
  id?: string;
  [property: string]: any;
}

export enum Category {
  Complete = "complete",
  Incomplete = "incomplete",
}
