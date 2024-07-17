/*

{
    "task_links": [
        {
            "id": "18",
            "from": {
                "id": "12"
            },
            "to": {
                "id": "87"
            },
            "category": "auto"
        },
        {
            "id": "11",
            "from": {
                "id": "18"
            },
            "to": {
                "id": "47"
            },
            "category": "dep"
        }
    ]
}

*/
/**
 * task_relation
 */
export interface TaskRelation {
  /**
   * 关联类型，分组
   */
  category: TaskRelationType;
  /**
   * 起始
   */
  from: From;
  /**
   * ID 编号
   */
  id: string;
  /**
   * 终止
   */
  to: To;
  [property: string]: any;
}

/**
 * 关联类型，分组
 *
 * task_relation_type
 */
export enum TaskRelationType {
  Auto = "auto",
  Dep = "dep",
}

/**
 * 起始
 */
export interface From {
  /**
   * ID 编号
   */
  id: string;
  [property: string]: any;
}

/**
 * 终止
 */
export interface To {
  /**
   * ID 编号
   */
  id: string;
  [property: string]: any;
}
