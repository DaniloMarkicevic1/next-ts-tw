import React, { ReactNode } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import AddCityToCountry from './AddCityToCountry';
import ListElement from './ListElement';

type Props = {
    data: {
        name: string;
        id: number;
    }[];
    deleteFunction: (id: number) => Promise<void>;
    page: string;
};

const List: React.FC<Props> = ({ data, deleteFunction, page }) => {
    return (
        <ul>
            {data &&
                data.map(({ name, id }) => (
                    <div key={id} className="flex items-center">
                        <ListElement name={name} key={id}>
                            <DeleteButton
                                handleDelete={deleteFunction}
                                id={id}
                            />
                        </ListElement>
                        {page === 'cities' && <AddCityToCountry id={id} />}
                    </div>
                ))}
        </ul>
    );
};

export default List;
