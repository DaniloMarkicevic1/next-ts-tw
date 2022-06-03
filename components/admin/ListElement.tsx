import React, { ReactNode } from 'react';

type Props = {
    name: string;
    children: ReactNode;
};

const ListElement: React.FC<Props> = ({ children, name }) => {
    return (
        <li className="w-3/12 flex items-center mb-2 font-medium justify-between">
            <p>{name}</p>
            {children}
        </li>
    );
};

export default ListElement;
