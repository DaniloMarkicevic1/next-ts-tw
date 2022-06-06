import React from 'react';

type Props = {};

const NotFound = (props: Props) => {
    return (
        <div className="w-full h-full flex justify-center items-center text-3xl font-bold text-gray-800">
            <p>404 Page Not Found</p>
        </div>
    );
};

export default NotFound;
