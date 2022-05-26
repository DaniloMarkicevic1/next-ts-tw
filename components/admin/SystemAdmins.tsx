import { ThumbDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import useSWR from 'swr';
import { User } from '../../models/User';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import PageTitle from '../PageTitle';

const SystemAdmins = () => {
    const { data, error, mutate } = useSWR(`users/admins`, fetcher);
    if (!data) return <p>Loading</p>;
    const adminsData: User[] = data.admins;

    const handleRemoveFromAdmins = async (id: number) => {
        await axiosInstance.put(`/users/admins/${id}`);
        mutate();
    };
    return (
        <>
            <PageTitle title="System Administrators:" />
            <ul>
                {adminsData.map((admin) => {
                    return (
                        <li
                            key={admin.id}
                            className="
                                flex
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
                            <Link href={`edit-employee/${admin.id}`}>
                                <a className="w-full h-full pl-2">
                                    <p>
                                        {admin.firstName} {admin.lastName}
                                    </p>
                                    <p>{admin.email}</p>
                                </a>
                            </Link>
                            <button
                                className="m-2 items-center bg-red-800 rounded-md flex py-1 px-2 text-gray-300 hover:opacity-75"
                                onClick={() => handleRemoveFromAdmins(admin.id)}
                            >
                                Remove From Admins
                                <ThumbDownIcon className="w-5 h-5 ml-2" />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default SystemAdmins;
