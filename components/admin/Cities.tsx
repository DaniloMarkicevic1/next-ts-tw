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
import AddCityToCountry from './AddCityToCountry';
import List from './List';

const Cities = () => {
    const { data: cities, mutate } = useSWR(`/cities`, fetcher);

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

    if (!cities) return <Spinner />;

    const citiesArray: City[] = cities.cities;

    return (
        <>
            <PageTitle title="Cities:" />
            <AddForm
                handleAdd={handleAddCity}
                inputName="addCity"
                buttonText="City"
            />
            <List
                data={citiesArray}
                deleteFunction={handleDeleteCity}
                page="cities"
            />
        </>
    );
};

export default Cities;
