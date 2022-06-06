import useSWR from 'swr';
import { ProjectType } from '../../models/Projects';
import { User } from '../../models/User';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import DeleteButton from '../buttons/DeleteButton';
import AddForm from './AddForm';
import PageTitle from '../PageTitle';
import Link from 'next/link';
import Spinner from '../layout/Spinner';

interface AdminProjects extends ProjectType {
    projectManager: User;
}

const Projects = () => {
    const { data: projects, error, mutate } = useSWR(`/projects`, fetcher);

    const handleAddProject = async (projectName: string) => {
        await axiosInstance.post(`/projects`, {
            project: { name: projectName },
        });
        mutate();
    };
    const handleDeleteProject = async (id: number) => {
        await axiosInstance.delete(`/projects/${id}`);
        mutate();
    };
    if (!projects) return <Spinner />;
    const projectsArray: AdminProjects[] = projects.projects;
    return (
        <>
            <PageTitle title="Projects:" />

            <AddForm
                buttonText="Project"
                inputName="addProject"
                handleAdd={handleAddProject}
            />

            {projects &&
                projectsArray.map(({ projectManager, name, id, employees }) => (
                    <section
                        key={id}
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
                        <Link href={`projects/edit/${id}`} passHref>
                            <a className="w-full h-full pl-2 py-2">
                                <p>Project Name: {name}</p>
                                <p>
                                    Project Manager: {projectManager?.firstName}{' '}
                                    {projectManager?.lastName}
                                </p>
                                <p>
                                    Number of people on project:{' '}
                                    {employees.length}
                                </p>
                            </a>
                        </Link>
                        <DeleteButton
                            handleDelete={handleDeleteProject}
                            id={id}
                        />
                    </section>
                ))}
        </>
    );
};

export default Projects;
