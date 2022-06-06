export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    googleId: string;
    role: string;
    seniority: string;
    plan: string;
    city: {
        id: number;
        name: string;
        country: {
            id: number;
            name: string;
        };
    };
    technologies: { id: number; name: string }[];
    project: { name: string };
    pm_project: { name: string };
}
