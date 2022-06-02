import useSWR from 'swr';
import { Tech } from '../../models/Technologies';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import DeleteButton from '../buttons/DeleteButton';
import AddForm from './AddForm';
import ListElement from './ListElement';
import PageTitle from '../PageTitle';
import Spinner from '../layout/Spinner';

const Technologies = () => {
    const { data, mutate } = useSWR(`/technologies`, fetcher);

    const handleAddTech = async (techName: string) => {
        await axiosInstance.post(`/technologies`, {
            technology: { name: techName },
        });
        mutate();
    };

    const handleDeleteTech = async (id: number) => {
        await axiosInstance.delete(`/technologies/${id}`);
        mutate();
    };

    if (!data) return <Spinner />;

    const techArray: Tech[] = data.technologies;

    return (
        <>
            <PageTitle title="Technologies:" />
            <AddForm
                handleAdd={handleAddTech}
                inputName="addTech"
                buttonText="Technology"
            />
            {techArray.map((tech) => (
                <ListElement name={tech.name} key={tech.id}>
                    <DeleteButton
                        handleDelete={handleDeleteTech}
                        id={tech.id}
                    />
                </ListElement>
            ))}
        </>
    );
};

export default Technologies;
