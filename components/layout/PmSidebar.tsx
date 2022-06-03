import { FolderIcon, UserGroupIcon, UserIcon } from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';

type Props = {
    open: boolean;
};

const PmSidebar: React.FC<Props> = ({ open }) => {
    return (
        <>
            <ul className={`${!open && 'invisible'}`}>
                <SidebarRow
                    Icon={UserIcon}
                    rowLink={'/pm/all-employees'}
                    rowText={'All Employees'}
                    index={0}
                />
                <SidebarRow
                    Icon={UserGroupIcon}
                    rowLink={'/pm/my-employees'}
                    rowText={'My Employees'}
                    index={1}
                />
                <SidebarRow
                    Icon={FolderIcon}
                    rowLink={'/pm/projects'}
                    rowText={'Projects'}
                    index={2}
                />
            </ul>
        </>
    );
};

export default PmSidebar;
