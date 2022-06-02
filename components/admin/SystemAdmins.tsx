import useSWR from 'swr';
import { Employee } from '../../models/Employees';
import { User } from '../../models/User';
import { fetcher } from '../../services/fetcher';
import Spinner from '../layout/Spinner';
import PageTitle from '../PageTitle';
import UsersList from './UsersList';

const SystemAdmins = () => {
    const { data, error, mutate } = useSWR(`users/admins`, fetcher);
    if (!data) return <Spinner />;
    const adminsData: Employee[] = data.admins;

    return (
        <>
            <PageTitle title="System Administrators:" />
            <UsersList users={adminsData} />
        </>
    );
};

export default SystemAdmins;
