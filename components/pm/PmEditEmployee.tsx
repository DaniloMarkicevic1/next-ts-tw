import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline';
import { FormEvent, useReducer } from 'react';
import { KeyedMutator } from 'swr/dist/types';
import { useContextHook } from '../../context/context';
import { Employee } from '../../models/Employees';
import { ProjectType } from '../../models/Projects';
import axiosInstance from '../../services/axiosInstance';
import Spinner from '../layout/Spinner';
import EmployeeNotes from './EmployeeNotes';
const initialState = {
    text: '',
    projectId: 0,
};
interface Props {
    employee: Employee;
    projects: ProjectType[];
    modalOpen: boolean;
    mutate: KeyedMutator<{}>;
}
interface ReducerState {
    text: string;
    projectId: number;
}

const reducer = (state: ReducerState, action: any) => {
    switch (action.type) {
        case 'update_input':
            return { ...state, [action.key]: action.payload };
        default:
            return state;
    }
};

const PmEditEmployee: React.FC<Props> = ({ employee, projects, mutate }) => {
    const { setModalDataIsLoaded, setEmployeeModalOpen } = useContextHook();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        id,
        firstName,
        lastName,
        seniority,
        city,
        email,
        notes,
        plan,
        project,
        role,
        technologies,
    }: Employee = employee!;

    const handleSubmitNote = async () => {
        await axiosInstance.post(`/notes/${id}`, {
            note: { text: state.text },
        });
        mutate();
        state.text = '';
    };
    const handleSubmitChangeProject = async () => {
        await axiosInstance.post(`/users/${id}/project/${state.projectId}`);
        mutate();
    };
    return (
        <>
            <p className="text-gray-300 font-bold text-5xl mb-7 bg-gray-800 p-3 rounded-xl">
                Employee Info
            </p>
            <section
                className={`
                h-2/3
                rounded-xl
                text-white 
                bg-green-700 
                z-50
                max-w-7xl 
                py-2
                px-3
                w-10/12
                justify-items-start
                grid
                grid-cols-6
                `}
            >
                <div className="col-span-3 flex flex-col justify-between pb-7">
                    <button
                        onClick={() => {
                            setEmployeeModalOpen && setEmployeeModalOpen(false);
                            setModalDataIsLoaded && setModalDataIsLoaded(false);
                        }}
                        type="button"
                        className="flex items-center justify-self-start max-w-fit bg-gray-800 rounded-lg py-2 px-3 hover:bg-opacity-75"
                    >
                        <ArrowLeftIcon className="w-4 mr-3 h-4" />
                        Go Back
                    </button>
                    {/* Close Modal */}
                    {/* Employee Information */}
                    <p>E-mail: {email}</p>
                    <p>
                        Name: {firstName} {lastName}
                    </p>
                    <p className="capitalize">Seniority: {seniority}</p>
                    <p className="capitalize">Role: {role}</p>
                    <p>Plan: {plan}</p>
                    <p>Country: {city?.country.name}</p>
                    <p>City: {city?.name}</p>
                    <p>
                        Project Manager: {project?.projectManager?.firstName}{' '}
                        {project?.projectManager?.lastName}
                    </p>
                    <p>Project: {project?.name}</p>
                    {/* Select Project Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitChangeProject();
                        }}
                    >
                        <label>Select Project: </label>
                        <select
                            name="projectId"
                            value={state.projectId}
                            className="py-2 px-1 text-gray-800 hover:cursor-pointer rounded-lg"
                            onInput={(e) => {
                                const target = e.target as HTMLSelectElement;
                                dispatch({
                                    type: 'update_input',
                                    payload: target.value,
                                    key: target.name,
                                });
                            }}
                        >
                            {projects.map((project) => {
                                return (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            type="submit"
                            className="ml-2 bg-gray-800 py-2 px-3 rounded-lg"
                        >
                            Change Project
                        </button>
                    </form>
                    <p>
                        Technologies:{' '}
                        {technologies?.map((technology) => {
                            return (
                                <span key={technology.id}>
                                    {technology.name}{' '}
                                </span>
                            );
                        })}
                    </p>
                </div>
                {/* NOTES: Add and See */}
                <EmployeeNotes
                    handleSubmit={handleSubmitNote}
                    text={state.text}
                    notes={notes}
                    dispatch={dispatch}
                />
            </section>
        </>
    );
};

export default PmEditEmployee;
