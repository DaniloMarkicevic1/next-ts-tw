import React, { Children, ReactNode } from "react";

type Props = {
    name: string;
    children: ReactNode;
};

const ListElement: React.FC<Props> = ({ children, name }) => {
    return (
        <span className="flex items-center mb-2">
            <p>{name}</p>
            {children}
        </span>
    );
};

export default ListElement;
