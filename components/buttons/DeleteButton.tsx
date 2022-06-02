import { TrashIcon } from '@heroicons/react/outline';
import axiosInstance from '../../services/axiosInstance';

interface Props {
    id: number;
    handleDelete: (id: number) => Promise<void>;
}
const DeleteButton: React.FC<Props> = ({ handleDelete, id }) => {
    return (
        <button
            className="hover:bg-orange-300 hover:text-red-800 text-white mx-1 flex items-center bg-red-700 rounded-md py-1 px-3 min-w-fit"
            onClick={() => handleDelete(id)}
        >
            Delete
            <TrashIcon className="w-5 h-5 ml-1" />{' '}
        </button>
    );
};

export default DeleteButton;
