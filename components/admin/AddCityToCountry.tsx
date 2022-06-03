import { useState } from 'react';
import useSWR, { KeyedMutator, mutate } from 'swr';
import { Country } from '../../models/Countries';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import AddButton from '../buttons/AddButton';
import SmallSpinner from '../layout/SmallSpinner';
import Spinner from '../layout/Spinner';

type Props = {
    id: number;
};

const AddCityToCountry: React.FC<Props> = ({ id }) => {
    const { data: countries } = useSWR(`/countries`, fetcher);

    const [countryId, setCountryId] = useState('');
    const handleAddCityToCountry = async (
        cityId: number,
        countryId: string
    ) => {
        const res = await axiosInstance.post(
            `countries/${countryId}/city/${cityId}`
        );
        mutate(`/users/employees`);
        mutate(`/countries`);
        mutate(`/cities`);
    };
    if (!countries) return <SmallSpinner />;
    const countriesArray: Country[] = countries.countries;
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleAddCityToCountry(id, countryId);
            }}
            className="flex flex-row items-center space-x-6 mb-2"
        >
            <AddButton text="City To Country" />
            <select
                className="py-1 rounded-md"
                onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    setCountryId(target.value);
                }}
            >
                <option value={countryId}></option>
                {countriesArray.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default AddCityToCountry;
