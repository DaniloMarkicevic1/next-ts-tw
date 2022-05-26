export interface CitiesType {
    cities: City[];
}

export interface City {
    id: number;
    name: string;
    country: {
        id: number;
        name: string;
    };
}
