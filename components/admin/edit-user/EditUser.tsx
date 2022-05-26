import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../services/fetcher';

import { Employee } from '../../../models/Employees';

import PageTitle from '../../PageTitle';
import Forms from './Forms';
import User from './User';

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

    if (!cities) return <p>Loading</p>;
    if (!projects) return <p>Loading</p>;
    if (!technologies) return <p>Loading</p>;
    if (!data) return <p>Loading</p>;

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
