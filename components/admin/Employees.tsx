import useSWR from 'swr';
import { Employee } from '../../models/Employees';
import { fetcher } from '../../services/fetcher';
import Spinner from '../layout/Spinner';

import PageTitle from '../PageTitle';

import UsersList from './UsersList';

const AllEmployees: React.FC = () => {
    const { data, error, mutate } = useSWR(`/users/employees`, fetcher);

    if (!data) return <Spinner />;
    if (error) return null;

    const users: Employee[] = data.employees;

    return (
        <>
            <PageTitle title="Employees:" />
            <UsersList users={users} />
        </>
    );
};

export default AllEmployees;
