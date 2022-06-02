import { ThumbUpIcon } from '@heroicons/react/outline';
import React from 'react';

type Props = {
    handlePromote: (id: number) => Promise<void>;
    text: string;
    id: number;
};

const PromoteButton: React.FC<Props> = ({ handlePromote, text, id }) => {
    return (
        <button
            className="mx-1 bg-gray-900 flex text-gray-300 items-center justify-center rounded-md py-1 px-2 hover:bg-gray-300 hover:text-gray-800 min-w-fit"
            onClick={() => handlePromote(id)}
        >
            <p>Promote to {text}</p>
            <ThumbUpIcon className="w-5 h-5 ml-2" />
        </button>
    );
};

export default PromoteButton;
