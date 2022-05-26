import useSWR from 'swr';
import { City } from '../../models/Cities';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import DeleteButton from '../buttons/DeleteButton';
import AddForm from './AddForm';
import ListElement from './ListElement';
import PageTitle from '../PageTitle';

const Cities = () => {
    const { data: cities, mutate } = useSWR(`/cities`, fetcher);

    const handleDeleteCity = async ({ id }: { id: number }) => {
        await axiosInstance.delete(`/cities/${id}`);
        mutate();
    };
    const handleAddCity = async (cityName: string) => {
        await axiosInstance.post(`cities`, {
            city: { name: cityName },
        });
        mutate();
    };
    if (!cities) return null;
    const citiesArray: City[] = cities.cities;
    return (
        <>
            <PageTitle title="Cities:" />
            <AddForm
                handleAdd={handleAddCity}
                inputName="addCity"
                buttonText="City"
            />
            {cities &&
                citiesArray.map(({ name, id }) => (
                    <ListElement name={name} key={id}>
                        <DeleteButton handleDelete={handleDeleteCity} id={id} />
                    </ListElement>
                ))}
        </>
    );
};

export default Cities;
