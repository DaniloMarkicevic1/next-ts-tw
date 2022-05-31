import useSWR from 'swr';
import { Employee } from '../../models/Employees';
import { fetcher } from '../../services/fetcher';

import axiosInstance from '../../services/axiosInstance';
import PageTitle from '../PageTitle';
import Link from 'next/link';
import DeleteButton from '../buttons/DeleteButton';

const AllEmployees: React.FC = () => {
    const { data, error, mutate } = useSWR(`/users/employees`, fetcher);

    const handleMakePM = async (id: number) => {
        await axiosInstance.post(`users/pm/${id}`);
        mutate();
    };
    const handleMakeAdmin = async (id: number) => {
        await axiosInstance.post(`users/admins/${id}`);
        mutate();
    };

    const handleDeleteUser = async ({ id }: { id: number }) => {
        await axiosInstance.delete(`/users/${id}`);
        mutate();
    };

    if (!data) return null;
    if (error) return null;
    const users: Employee[] = data.employees;

    return (
        <>
            <PageTitle title="Employees:" />

            {users.map((user) => {
                return (
                    <section
                        key={user.id}
                        className="
                                z-10
                                rounded-lg
                                relative
                                text-gray-300
                                transition-all
                                flex
                                items-center
                                px-2
                              
                                mb-2
                                bg-green-800
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
                                after:duration-300
                                "
                    >
                        {' '}
                        <Link
                            className="z-20 w-full h-full"
                            key={user.id}
                            href={`edit-employee/${user.id}`}
                            passHref
                        >
                            <a className="flex h-full w-full py-6 space-x-2">
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p>Role: {user.role}</p>
                                <p>Seniority: {user.seniority}</p>
                                <p>City: {user.city?.name}</p>
                                <p>Country: {user.city?.country?.name}</p>
                                <p>
                                    Project:{' '}
                                    {user.project ? user.project?.name : 'N/A'}
                                </p>
                            </a>
                        </Link>
                        <button
                            className="bg-gray-800 flex flex-col min-w-fit items-center justify-center rounded-md py-1 px-2 hover:opacity-75"
                            onClick={() => handleMakePM(user.id)}
                        >
                            Make PM
                        </button>
                        <button
                            className="bg-gray-800 flex flex-col min-w-fit ml-2 items-center justify-center rounded-md py-1 px-2 hover:opacity-75"
                            onClick={() => handleMakeAdmin(user.id)}
                        >
                            Make Admin
                        </button>
                        <DeleteButton
                            id={user.id}
                            handleDelete={handleDeleteUser}
                        />
                    </section>
                );
            })}
        </>
    );
};

export default AllEmployees;
