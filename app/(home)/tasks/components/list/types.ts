/*

{
    "task_lists": [
        {
            "id": "40",
            "name": "那十称业知",
            "tasks": [
                {
                    "id": "23"
                },
                {
                    "id": "123"
                },
                {
                    "id": "1"
                },
                {
                    "id": "12"
                },
                {
                    "id": "321"
                },
                {
                    "id": "43"
                }
            ]
        },
        {
            "id": "4120",
            "name": "就吓唬我",
            "tasks": [
                {
                    "id": "23"
                },
                {
                    "id": "123"
                },
                {
                    "id": "1"
                },
                {
                    "id": "12"
                },
                {
                    "id": "321"
                },
                {
                    "id": "43"
                }
            ]
        }
    ]
}

*/

export interface Response {
  task_lists: TaskList[];
  [property: string]: any;
}

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
  /**
   * ID 编号
   */
  id: string;
  /**
   * GitHub PR
   */
  pr?: Pr;
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
