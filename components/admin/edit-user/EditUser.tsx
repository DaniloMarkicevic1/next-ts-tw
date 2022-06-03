import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../services/fetcher';

import { Employee } from '../../../models/Employees';

import PageTitle from '../../PageTitle';
import Forms from './Forms';
import User from './User';
import Spinner from '../../layout/Spinner';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const EditUser = () => {
    const { query } = useRouter();
    const id = query.id;

    const { data, mutate, isValidating } = useSWR(
        () => (id ? `/users/single-user/${id}` : null),
        fetcher
    );

    // Cities, Countries, Projects, Technologies for Select Options
    const { data: cities } = useSWR(() => `/cities`, fetcher);
    const { data: projects } = useSWR(() => `/projects`, fetcher);
    const { data: technologies } = useSWR(() => `/technologies`, fetcher);

    if (!cities) return <Spinner />;
    if (!projects) return <Spinner />;
    if (!technologies) return <Spinner />;
    if (!data) return <Spinner />;

    const user: Employee = data.user;

    const citiesArray = cities.cities;

    const projectsArray = projects.projects;
    const technologiesArray = technologies.technologies;

    return (
        <>
            <PageTitle
                title={`Edit ${user.role === 'project_manager' ? 'PM' : ''} ${
                    user.firstName
                } ${user.lastName}:`}
            />
            <Link href={'/admin/employees'}>
                <a className="mb-2 flex text-gray-300 items-center justify-self-start max-w-fit bg-gray-800 rounded-lg py-2 px-3 hover:bg-opacity-75">
                    <ArrowLeftIcon className="w-4 mr-3 h-4" />
                    Go Back
                </a>
            </Link>
            <User user={user} mutate={mutate} isValidating={isValidating} />
            {/* Edit Section */}
            <Forms
                userId={id}
                userRole={user.role}
                cities={citiesArray}
                projects={projectsArray}
                technologies={technologiesArray}
                mutate={mutate}
            />
            {/* ************ */}
        </>
    );
};

export default EditUser;
