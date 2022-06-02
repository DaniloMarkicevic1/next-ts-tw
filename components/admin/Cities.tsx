import useSWR from 'swr';
import { fetcher } from '../../services/fetcher';
import { useState } from 'react';

import axiosInstance from '../../services/axiosInstance';

import { City } from '../../models/Cities';
import { Country } from '../../models/Countries';

import DeleteButton from '../buttons/DeleteButton';
import AddForm from './AddForm';
import ListElement from './ListElement';
import PageTitle from '../PageTitle';
import AddButton from '../buttons/AddButton';
import Spinner from '../layout/Spinner';

const Cities = () => {
    const { data: cities, mutate } = useSWR(`/cities`, fetcher);
    const { data: countries } = useSWR(`/countries`, fetcher);

    const [countryId, setCountryId] = useState('');

    const handleDeleteCity = async (id: number) => {
        await axiosInstance.delete(`/cities/${id}`);
        mutate();
    };

    const handleAddCity = async (cityName: string) => {
        await axiosInstance.post(`cities`, {
            city: { name: cityName },
        });
        mutate();
    };

    const handleAddCityToCountry = async (
        cityId: number,
        countryId: string
    ) => {
        const res = await axiosInstance.post(
            `countries/${countryId}/city/${cityId}`
        );
        mutate();
    };

    if (!cities) return <Spinner />;
    if (!countries) return <Spinner />;

    const citiesArray: City[] = cities.cities;
    const countriesArray: Country[] = countries.countries;
    return (
        <>
            <PageTitle title="Cities:" />
            <AddForm
                handleAdd={handleAddCity}
                inputName="addCity"
                buttonText="City"
            />
            {cities &&
                citiesArray.map(({ name, id, country }) => (
                    <ListElement name={name} key={id}>
                        <DeleteButton handleDelete={handleDeleteCity} id={id} />
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddCityToCountry(id, countryId);
                            }}
                            className="flex items-center space-x-2"
                        >
                            <AddButton text="City To Country" />
                            <select
                                className="py-1 rounded-md"
                                onChange={(e) => {
                                    const target =
                                        e.target as HTMLSelectElement;
                                    setCountryId(target.value);
                                }}
                            >
                                <option value={countryId}></option>
                                {countries &&
                                    countriesArray.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.id}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                            </select>
                        </form>
                    </ListElement>
                ))}
        </>
    );
};

export default Cities;
