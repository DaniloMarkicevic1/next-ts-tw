import { Employee, User } from './Employees';

export interface Projects {
    projects: ProjectType[];
}

export interface ProjectType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    employees: [User];
    employeesCount: number;
}
