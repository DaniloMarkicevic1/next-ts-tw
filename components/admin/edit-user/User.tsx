import { XIcon } from "@heroicons/react/outline";
import { KeyedMutator } from "swr";
import { Employee } from "../../../models/Employees";
import axiosInstance from "../../../services/axiosInstance";

interface UserInterface {
    user: Employee;
    mutate: KeyedMutator<any>;
    isValidating: boolean;
}
const User: React.FC<UserInterface> = ({ user, mutate, isValidating }) => {
    const removeTech = async (id: number, techId: number) => {
        await axiosInstance.delete(`users/${id}/technology/${techId}`);
        mutate();
    };

    return (
        <section className="grid grid-cols-3 gap-2 bg-green-800 text-gray-300 rounded-lg p-2">
            {isValidating ? (
                <div className="w-full h-full opacity-20 bg-black absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    IS VALIDATING
                </div>
            ) : null}

            <div>
                <p>
                    Name: {user.firstName} {user.lastName}
                </p>
                <p>E-mail: {user.email}</p>
                <p className="capitalize">Seniority: {user.seniority}</p>
            </div>

            <div>
                <p>City: {user.city?.name}</p>
                <p>Country: {user.city?.country?.name}</p>
            </div>

            <div>
                <p>
                    Project:{" "}
                    {user.pm_project
                        ? user.pm_project?.name
                        : user.project?.name}
                </p>
                <p>
                    Project Manager:{" "}
                    {user.role === "project_manager" && (
                        <>
                            {user.pm_project?.projectManager.firstName}{" "}
                            {user.pm_project?.projectManager.lastName}
                        </>
                    )}
                    {user.role !== "project_manager" && (
                        <>
                            {user.project?.projectManager?.firstName}{" "}
                            {user.project?.projectManager?.lastName}
                        </>
                    )}
                </p>
            </div>
            <div className="flex col-span-full">
                Technologies:{" "}
                <div>
                    {user.technologies.map((tech) => {
                        return (
                            <span
                                key={tech.id}
                                className="flex flex-rowitems-center float-left"
                            >
                                <p>{tech.name}</p>
                                <button
                                    className="bg-white ml-1 rounded-full hover:bg-opacity-75"
                                    onClick={() => removeTech(user.id, tech.id)}
                                >
                                    <XIcon className="h-5 w-5 text-red-700" />
                                </button>
                                &nbsp;,&nbsp;
                            </span>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default User;
