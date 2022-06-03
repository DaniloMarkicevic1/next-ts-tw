import { mutate } from 'swr';
import { Employee } from '../../models/Employees';
import axiosInstance from '../../services/axiosInstance';
import DeleteButton from '../buttons/DeleteButton';
import PromoteButton from '../buttons/PromoteButton';
import RemoveButton from '../buttons/RemoveButton';
import UserInfo from './UserInfo';

type Props = {
    user: Employee;
};

const UserListItem: React.FC<Props> = ({ user }) => {
    const handleMakeAdmin = async (id: number) => {
        await axiosInstance.post(`users/admins/${id}`);

        mutate('/users/pm');
        mutate('/users/employees');
    };

    const handleRemoveFromPms = async (id: number) => {
        await axiosInstance.put(`/users/pm/${id}`);
        mutate(`users/pm`);
        mutate(`users/employees`);
    };

    const handleDeleteUser = async (id: number) => {
        await axiosInstance.delete(`/users/${id}`);
        mutate(`/users/pm`);
        mutate(`/users/employees`);
        mutate(`/users/admins`);
    };
    const handleRemoveFromAdmins = async (id: number) => {
        await axiosInstance.put(`/users/admins/${id}`);
        mutate(`users/admins`);
    };
    const handleMakePM = async (id: number) => {
        await axiosInstance.post(`users/pm/${id}`);
        mutate(`/users/employees`);
    };
    return (
        <li
            key={user.firstName}
            className="
                    flex
                    basis-full
                    pr-3
                    items-center
                    bg-green-800
                    text-gray-300
                    mb-2
                    rounded-md 
                    z-10
                    relative    
                    transition-all
                    hover:cursor-pointer
                    after:origin-cursor
                    after:absolute
                    after:rounded-full
                    after:top-0
                    after:left-0
                    after:w-full
                    after:h-full
                    after:-z-10
                    after:scale-y-0
                    after:scale-x-0
                    after:hover:rounded-md
                    after:hover:scale-x-100
                    after:hover:scale-y-100
                    after:hover:bg-green-600
                    after:duration-300"
        >
            <UserInfo user={user} />

            {/* Button Section */}
            {user.role === 'employee' && (
                <>
                    <PromoteButton
                        text="PM"
                        handlePromote={handleMakePM}
                        id={user.id}
                    />
                    <PromoteButton
                        text="Admin"
                        handlePromote={handleMakeAdmin}
                        id={user.id}
                    />
                </>
            )}

            {user.role === 'project_manager' && (
                <>
                    <PromoteButton
                        text="Admin"
                        handlePromote={handleMakeAdmin}
                        id={user.id}
                    />
                    <RemoveButton
                        text="PM"
                        handleRemove={handleRemoveFromPms}
                        userId={user.id}
                    />
                </>
            )}
            {user.role === 'admin' && (
                <RemoveButton
                    text="Admins"
                    handleRemove={handleRemoveFromAdmins}
                    userId={user.id}
                />
            )}
            <DeleteButton id={user.id} handleDelete={handleDeleteUser} />
            {/* ******************** */}
        </li>
    );
};

export default UserListItem;
