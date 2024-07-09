/**
 * project
 */
export interface Project {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 项目介绍
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
  status_pool?: StatusPool;
  [property: string]: any;
}

/**
 * status_pool
 */
export interface StatusPool {
  complete: StatusItem;
  incomplete: Incomplete[];
  [property: string]: any;
}

/**
 * status_item
 */
export interface StatusItem {
  /**
   * 简介
   */
  description: string;
  /**
   * 名称
   */
  name: string;
  [property: string]: any;
}

export interface Incomplete {
  /**
   * 状态池中状态的 ID 编号
   */
  id: string;
  status: StatusItem;
  [property: string]: any;
}
