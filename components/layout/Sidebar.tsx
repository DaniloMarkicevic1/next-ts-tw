import React from 'react';
import AdminSidebar from './AdminSidebar';
import PmSidebar from './PmSidebar';

type Props = {
    role: string;
    open: boolean;
};

const Sidebar: React.FC<Props> = ({ role, open }) => {
    return (
        <>
            <nav
                className={`bg-green-800 float-left min-h-[calc(100%-64px)] ${
                    !open ? 'opacity-0 w-0' : 'opacity-1 w-44'
                } duration-500 ease-in-out`}
            >
                {role === 'admin' && <AdminSidebar open={open} />}
                {role === 'project_manager' && <PmSidebar open={open} />}
            </nav>
        </>
    );
};

export default Sidebar;
