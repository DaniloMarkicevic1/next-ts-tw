export interface EmployeesRes {
    employeesRes: {
        employees: Employee[];
        employeeCount: number;
        current_page: number;
        last_page: number;
        users: User[];
    };
}
export interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    googleId: string | null;
    role: "admin" | "project_manager" | "employee";
    seniority: "intern" | "junior" | "medior" | "senior";
    plan: string;
    project: {
        name: string;
        createdAt: string;
        updatedAt: string;
        employees: [{}];
        id: number;
        projectManager: User;
    };
    pm_project: {
        name: string;
        createdAt: string;
        updatedAt: string;
        employees: [{}];
        id: number;
        projectManager: User;
    };
    technologies: [{ name: string; id: number }];

    notes: [
        {
            text: string;
            createdAt: string;
            updatedAt: string;
            id: number;
            createdBy: string;
            employee: {};
        }
    ];
    id: number;
    city: {
        name: string;
        id: number;
        users: [{}];
        country: { name: string; citites: []; id: number };
    };
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    googleId: null | string;
    role: string;
    seniority: string;
    plan: string;
}
