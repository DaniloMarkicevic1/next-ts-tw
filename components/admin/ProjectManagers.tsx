import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import Link from "next/link";

import useSWR from "swr";
import { User } from "../../models/User";
import axiosInstance from "../../services/axiosInstance";
import { fetcher } from "../../services/fetcher";
import PageTitle from "../PageTitle";

const ProjectManagers = () => {
    const { data, mutate } = useSWR(`/users/pm`, fetcher);
    if (!data) return <p>Loading</p>;

    const handleMakeAdmin = (id: number) => {
        axiosInstance.post(`/users/admins/${id}`);
        mutate();
    };
    const handleRemoveFromPms = (id: number) => {
        axiosInstance.put(`/users/pm/${id}`);
        mutate();
    };
    const projectManagers: User[] = data.project_managers;
    return (
        <>
            <PageTitle title="Project Managers:" />
            <ul>
                {projectManagers.map((pm) => {
                    return (
                        <li
                            key={pm.id}
                            className="
                                flex
                                justify-between
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
                            <Link href={`edit-employee/${pm.id}`}>
                                <a className="py-2 pl-2 w-full h-full">
                                    <p>
                                        Name: {pm.firstName} {pm.lastName}
                                    </p>
                                    <p>E-mail: {pm.email}</p>
                                </a>
                            </Link>
                            <div className="flex space-x-2 mr-2 my-2">
                                <button
                                    className="bg-green-900 flex text-gray-300 items-center justify-center rounded-md py-1 px-2 hover:opacity-75"
                                    onClick={() => handleMakeAdmin(pm.id)}
                                >
                                    Make an Admin
                                    <ThumbUpIcon className="w-5 h-5 ml-2" />
                                </button>
                                <button
                                    className="bg-red-800 justify-center items-center rounded-md flex py-1 px-2 text-gray-300 hover:opacity-75"
                                    onClick={() => handleRemoveFromPms(pm.id)}
                                >
                                    Remove As PM
                                    <ThumbDownIcon className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default ProjectManagers;
