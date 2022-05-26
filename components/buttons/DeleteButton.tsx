import { TrashIcon } from "@heroicons/react/outline";

interface Props {
    id: number;
    handleDelete: ({ id }: { id: number }) => Promise<void>;
}
const DeleteButton: React.FC<Props> = ({ handleDelete, id }) => {
    return (
        <button
            className="hover:bg-opacity-75 text-white ml-2 flex items-center bg-red-700 rounded-md py-1 px-3 hover:bg-opaCountry-50"
            onClick={() => handleDelete({ id })}
        >
            Delete
            <TrashIcon className="w-5 h-5 ml-1" />{" "}
        </button>
    );
};

export default DeleteButton;
