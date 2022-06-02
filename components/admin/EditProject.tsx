import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '../../models/Employees';
import { ProjectType } from '../../models/Projects';
import { fetcher } from '../../services/fetcher';
import Spinner from '../layout/Spinner';
import PageTitle from '../PageTitle';
import EditProjectUsers from './EditProjectUsers';

interface Project extends ProjectType {
    projectManager: User;
}

const EditProject = () => {
    const router = useRouter();
    const id = router.query.id;
    const { data: project, mutate } = useSWR(
        () => (id ? `/projects/${id}` : null),
        fetcher
    );
    const {
        error,
        data: users,
        mutate: mutateUsers,
    } = useSWR(
        `/users/no-project`,

        fetcher
    );
    if (!project) return <Spinner />;
    if (!users) return <Spinner />;
    const projectData: Project = project.project;
    const usersData: User[] = users.users;
    return (
        <>
            <PageTitle title={`Edit Project: ${projectData.name}`} />
            <Link href={'/admin/projects'}>
                <a className="flex text-gray-300 items-center justify-self-start max-w-fit bg-gray-800 rounded-lg py-2 px-3 hover:bg-opacity-75">
                    <ArrowLeftIcon className="w-4 mr-3 h-4" />
                    Go Back
                </a>
            </Link>

            <p>
                Project Manager: {projectData.projectManager?.firstName}{' '}
                {projectData.projectManager?.lastName}
            </p>

            <p>Manager E-mail: {projectData.projectManager?.email}</p>
            <hr className="border-gray-800 my-2" />
            <section className="grid grid-cols-2 max-w-10/12 m-auto">
                <EditProjectUsers
                    employees={projectData.employees}
                    text="Employees Working on Project:"
                    mutate={mutate}
                    toAdd={false}
                    mutateUsers={mutateUsers}
                />
                <EditProjectUsers
                    employees={usersData}
                    text="Available Users:"
                    mutate={mutate}
                    toAdd={true}
                    mutateUsers={mutateUsers}
                />
            </section>
        </>
    );
};

export default EditProject;
