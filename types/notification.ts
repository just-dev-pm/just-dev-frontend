/**
 * notification
 */
export interface Notification {
  /**
   * 资产
   */
  asset: Asset;
  /**
   * 内容
   */
  content: string;
  /**
   * 是否已读
   */
  handled: boolean;
  /**
   * ID 编号
   */
  id: string;
  /**
   * 标题
   */
  title: string;
  [property: string]: any;
}

/**
 * 资产
 *
 * asset
 *
 * 任务
 *
 * 草稿
 *
 * 事件
 */
export interface Asset {
  /**
   * 任务 ID 编号
   *
   * 草稿 ID 编号
   *
   * 事件 ID 编号
   */
  id: string;
  /**
   * 通知源
   */
  source: Source;
  [property: string]: any;
}

export enum Source {
  Draft = "draft",
  Event = "event",
  Task = "task",
}
