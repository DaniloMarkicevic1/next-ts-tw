import { ThumbDownIcon } from '@heroicons/react/outline';

interface Props {
    id: number;
    handleRemove: (id: number) => Promise<void>;
    text: string;
}

const RemoveButton: React.FC<Props> = ({ handleRemove, id, text }) => {
    return (
        <button
            onClick={() => handleRemove(id)}
            className="bg-red-700 flex items-center mx-1 text-gray-300 rounded-md py-1 px-3 hover:opacity-75 min-w-fit hover:bg-orange-300 hover:text-red-800"
        >
            Remove From {text}
            <ThumbDownIcon className="w-5 h-5 ml-2" />
        </button>
    );
};

export default RemoveButton;
