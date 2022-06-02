import {
    AcademicCapIcon,
    ClipboardCheckIcon,
    CodeIcon,
    CogIcon,
    FolderIcon,
    GlobeIcon,
    OfficeBuildingIcon,
    UserGroupIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { useContextHook } from '../../context/context';
import SidebarRow from './SidebarRow';

type Props = {
    open: boolean;
};

const AdminSidebar: React.FC<Props> = ({ open }) => {
    const { sideBarIndex, setSideBarIndex } = useContextHook();

    console.log(sideBarIndex);
    return (
        <>
            <ul className={`mt-4  ${!open ? 'pointer-events-none' : ''}`}>
                <SidebarRow
                    index={0}
                    Icon={UserGroupIcon}
                    rowLink={'/admin/employees'}
                    rowText={'Employees'}
                    setIndex={setSideBarIndex}
                />
                <SidebarRow
                    index={1}
                    Icon={FolderIcon}
                    rowLink={'/admin/projects'}
                    rowText={'Projects'}
                    setIndex={setSideBarIndex}
                />
                <SidebarRow
                    index={2}
                    Icon={CodeIcon}
                    rowLink={'/admin/technologies'}
                    setIndex={setSideBarIndex}
                    rowText={'Technologies'}
                />
                <SidebarRow
                    index={3}
                    Icon={GlobeIcon}
                    rowLink={'/admin/countries'}
                    rowText={'Countries'}
                    setIndex={setSideBarIndex}
                />
                <SidebarRow
                    index={4}
                    Icon={OfficeBuildingIcon}
                    rowLink={'/admin/cities'}
                    rowText={'Cities'}
                    setIndex={setSideBarIndex}
                />
                <SidebarRow
                    index={5}
                    Icon={ClipboardCheckIcon}
                    rowLink={'/admin/project-managers'}
                    setIndex={setSideBarIndex}
                    rowText={'Project Managers'}
                />
                <SidebarRow
                    index={6}
                    Icon={CogIcon}
                    rowLink={'/admin/system-admins'}
                    setIndex={setSideBarIndex}
                    rowText={'System Administrators'}
                />
                <SidebarRow
                    index={7}
                    Icon={AcademicCapIcon}
                    rowLink={'/admin/seniorities'}
                    setIndex={setSideBarIndex}
                    rowText={'Seniorities'}
                />
            </ul>
        </>
    );
};

export default AdminSidebar;
