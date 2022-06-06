import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { userInfo } from 'os';

import useSWR from 'swr';
import { Employee } from '../../models/Employees';
import { User } from '../../models/User';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
import DeleteButton from '../buttons/DeleteButton';
import PromoteButton from '../buttons/PromoteButton';
import RemoveButton from '../buttons/RemoveButton';
import Spinner from '../layout/Spinner';
import PageTitle from '../PageTitle';
import UsersList from './UsersList';

const ProjectManagers: React.FC = () => {
    const { data } = useSWR(`/users/pm`, fetcher);
    if (!data) return <Spinner />;

    const projectManagers: Employee[] = data.project_managers;
    return (
        <>
            <PageTitle title="Project Managers:" />
            <UsersList users={projectManagers} />
        </>
    );
};

export default ProjectManagers;
