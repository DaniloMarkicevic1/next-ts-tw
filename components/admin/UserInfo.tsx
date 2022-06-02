import Link from 'next/link';
import React from 'react';
import { Employee } from '../../models/Employees';

type Props = {
    user: Employee;
};

const UserInfo: React.FC<Props> = ({ user }) => {
    return user.role !== 'employee' ? (
        // User is Admin or Project Manager
        <Link href={`edit-employee/${user.id}`}>
            <a className="py-3 pl-2 w-full h-full">
                <p>
                    Name: {user.firstName} {user.lastName}
                </p>
                <p>E-mail: {user.email}</p>
            </a>
        </Link>
    ) : (
        // User is Employee
        <Link
            className="z-20 w-full h-full"
            key={user.id}
            href={`edit-employee/${user.id}`}
            passHref
        >
            <a className="flex h-full w-full py-6 pl-2 space-x-2">
                <p>
                    {user.firstName} {user.lastName}
                </p>
                <p>Role: {user.role}</p>
                <p>Seniority: {user.seniority}</p>
                <p>City: {user.city?.name}</p>
                <p>Country: {user.city?.country?.name}</p>
                <p>Project: {user.project ? user.project?.name : 'N/A'}</p>
            </a>
        </Link>
    );
};

export default UserInfo;
