import useSWR from 'swr';

import { Country } from '../../models/Countries';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import DeleteButton from '../buttons/DeleteButton';
import AddForm from './AddForm';
import ListElement from './ListElement';
import PageTitle from '../PageTitle';
import Spinner from '../layout/Spinner';

const Countries = () => {
    const { data: countries, mutate } = useSWR(`/countries`, fetcher);

    const handleDeleteCountry = async (id: number) => {
        await axiosInstance.delete(`/countries/${id}`);
        mutate();
    };
    const handleAddCountry = async (countryName: string) => {
        await axiosInstance.post(`countries`, {
            country: { name: countryName },
        });
        mutate();
    };
    if (!countries) return <Spinner />;
    const countriesArray: Country[] = countries.countries.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
    );
    return (
        <>
            <PageTitle title="Countries:" />

            <AddForm
                handleAdd={handleAddCountry}
                inputName="addCountry"
                buttonText="Country"
            />
            {countries &&
                countriesArray.map(({ name, id }) => (
                    <ListElement name={name} key={id}>
                        <DeleteButton
                            handleDelete={handleDeleteCountry}
                            id={id}
                        />
                    </ListElement>
                ))}
        </>
    );
};

export default Countries;
