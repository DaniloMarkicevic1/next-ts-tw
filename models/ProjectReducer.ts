import { Projects, ProjectType } from './Projects';

export interface ReducerProjects extends Projects {
    filteredProjects: ProjectType[];
}

export interface ReducerProjectType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    employees: [];
    employeesCount: number;
}
export type Action =
    | { type: 'filter'; searchTerm: string }
    | {
          type: 'initialState';
          payload: ProjectType[];
      };
