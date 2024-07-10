/**
 * user
 */
export interface User {
  avatar?: string;
  email?: string;
  /**
   * ID 编号
   */
  id: string;
  status_pool?: StatusPool;
  username: string;
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
