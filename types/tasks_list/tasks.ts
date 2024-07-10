export interface Response {
    tasks: Task[];
    [property: string]: any;
}

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
     * 状态
     */
    status?: Status;
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
 * 状态
 */
export interface Status {
    pool: StatusPool;
    /**
     * 状态
     */
    status_item: StatusItem;
    [property: string]: any;
}

/**
 * 状态池
 */
export interface StatusPool {
    complete: CompleteObject;
    incomplete: Incomplete[];
    [property: string]: any;
}

/**
 * 状态项
 */
export interface CompleteObject {
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
    status: CompleteObject;
    [property: string]: any;
}

/**
 * 状态
 */
export interface StatusItem {
    /**
     * 分组
     */
    category: Category;
    id?: string;
}

export enum Category {
    Complete = "complete",
    Incomplete = "incomplete",
}