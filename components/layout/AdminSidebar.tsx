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

import SidebarRow from './SidebarRow';

type Props = {
    open: boolean;
};

const AdminSidebar: React.FC<Props> = ({ open }) => {
    return (
        <>
            <ul className={`mt-4  ${!open ? 'pointer-events-none' : ''}`}>
                <SidebarRow
                    index={0}
                    Icon={UserGroupIcon}
                    rowLink={'/admin/employees'}
                    rowText={'Employees'}
                />
                <SidebarRow
                    index={1}
                    Icon={FolderIcon}
                    rowLink={'/admin/projects'}
                    rowText={'Projects'}
                />
                <SidebarRow
                    index={2}
                    Icon={CodeIcon}
                    rowLink={'/admin/technologies'}
                    rowText={'Technologies'}
                />
                <SidebarRow
                    index={3}
                    Icon={GlobeIcon}
                    rowLink={'/admin/countries'}
                    rowText={'Countries'}
                />
                <SidebarRow
                    index={4}
                    Icon={OfficeBuildingIcon}
                    rowLink={'/admin/cities'}
                    rowText={'Cities'}
                />
                <SidebarRow
                    index={5}
                    Icon={ClipboardCheckIcon}
                    rowLink={'/admin/project-managers'}
                    rowText={'Project Managers'}
                />
                <SidebarRow
                    index={6}
                    Icon={CogIcon}
                    rowLink={'/admin/system-admins'}
                    rowText={'System Administrators'}
                />
                <SidebarRow
                    index={7}
                    Icon={AcademicCapIcon}
                    rowLink={'/admin/seniorities'}
                    rowText={'Seniorities'}
                />
            </ul>
        </>
    );
};

export default AdminSidebar;
