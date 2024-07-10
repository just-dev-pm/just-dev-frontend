export interface Projects {
    projects:Project[]
}


export interface Project {
    /**
     * ID 编号
     */
    id: string;
    /**
     * 权限
     */
    position: Position;
    [property: string]: any;
}

/**
 * 权限
 */
export enum Position {
    Admin = "admin",
    Member = "member",
}