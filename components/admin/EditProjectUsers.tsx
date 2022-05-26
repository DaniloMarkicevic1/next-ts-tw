import { PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";
import { User } from "../../models/Employees";
import axiosInstance from "../../services/axiosInstance";
import RemoveButton from "../buttons/RemoveButton";

interface Props {
    employees: User[];
    text: string;
    mutate: KeyedMutator<any>;
    toAdd: boolean;
    mutateUsers: KeyedMutator<any>;
}
interface RemoveFunctionProps {
    userId: number;
}
interface AddFunctionProps {
    userId: number;
    projectId: string | string[] | undefined;
}
const EditProjectUsers: React.FC<Props> = ({
    employees,
    text,
    mutate,
    toAdd,
    mutateUsers,
}) => {
    const router = useRouter();
    const projectId = router.query.id;
    const handleRemoveFromProject = async ({ userId }: RemoveFunctionProps) => {
        await axiosInstance.post(`users/project/${userId}`);
        mutateUsers();
        mutate();
    };
    const handleAddToProject = async ({
        userId,
        projectId,
    }: AddFunctionProps) => {
        await axiosInstance.post(`users/${userId}/project/${projectId}`);
        mutate();
        mutateUsers();
    };

    return (
        <div>
            <p>{text}</p>
            <ul>
                {employees.map((employee) => {
                    if (toAdd === true && employee.role !== "employee") {
                        return;
                    }
                    return (
                        <li
                            key={employee.id}
                            className="w-10/12 flex mb-2 items-center justify-between"
                        >
                            <div className="flex">
                                <p>
                                    {employee.firstName} {employee.lastName}
                                </p>
                                <p className="capitalize text-right">
                                    &nbsp; - {employee.seniority}
                                </p>
                            </div>
                            {toAdd === false && (
                                <RemoveButton
                                    handleRemove={handleRemoveFromProject}
                                    userId={employee.id}
                                />
                            )}
                            {toAdd === true && (
                                <button
                                    onClick={() =>
                                        handleAddToProject({
                                            userId: employee.id,
                                            projectId: projectId,
                                        })
                                    }
                                    className="flex items-center bg-green-700 text-gray-300 rounded-md py-1 px-2 hover:opacity-75"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Add To Project
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EditProjectUsers;
