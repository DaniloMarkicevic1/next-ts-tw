import { KeyedMutator } from "swr";
import { City } from "./Cities";

import { ProjectType } from "./Projects";
import { Tech } from "./Technologies";

export interface FormInterface {
    userId: string | string[] | undefined;
    cities: City[];
    mutate: KeyedMutator<any>;
    technologies: Tech[];
    projects: ProjectType[];
    userRole: string;
}
export interface ReducerState {
    city: string;
    project: string;
    technology: string;
    seniority: string;
}
export interface ActionType {
    type: "update_input";
    payload: string;
    key: string;
}
