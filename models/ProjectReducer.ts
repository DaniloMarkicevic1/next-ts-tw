export interface ReducerProjects {
    projects: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        employees: [];
        employeesCount: number;
    }[];
    filteredProjects: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        employees: [];
        employeesCount: number;
    }[];
}

export interface ReducerProjectType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    employees: [];
    employeesCount: number;
}
