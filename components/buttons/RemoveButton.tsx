import { MinusIcon } from "@heroicons/react/outline";

interface Props {
    userId: number;
    handleRemove: ({ userId }: { userId: number }) => Promise<void>;
}

const RemoveButton: React.FC<Props> = ({ handleRemove, userId }) => {
    return (
        <button
            onClick={() => handleRemove({ userId })}
            className="bg-red-700 flex items-center ml-2 text-gray-300 rounded-md py-1 px-3 hover:opacity-75"
        >
            <MinusIcon className="w-5 h-5 mr-2" />
            Remove From Project
        </button>
    );
};

export default RemoveButton;
