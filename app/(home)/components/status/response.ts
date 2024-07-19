export interface Response {
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
 * 状态池
 */
export interface StatusPool {
  complete: StatusContent;
  incomplete: Incomplete[];
  [property: string]: any;
}

/**
 * 状态内容
 */
export interface StatusContent {
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
  status: StatusContent;
  [property: string]: any;
}
