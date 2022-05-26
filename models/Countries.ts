import { City } from "./Cities";

export interface Countries {
    countries: Country[];
}

export interface Country {
    id: number;
    name: string;
    cities: City[];
}
