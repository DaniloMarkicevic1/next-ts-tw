import React from 'react';
import { Employee } from '../../models/Employees';

import UserListItem from './UserListItem';

type Props = {
    users: Employee[];
};

const UsersList: React.FC<Props> = ({ users }) => {
    return (
        <ul>
            {users.map((user) => {
                return <UserListItem key={user.id} user={user} />;
            })}
        </ul>
    );
};

export default UsersList;
