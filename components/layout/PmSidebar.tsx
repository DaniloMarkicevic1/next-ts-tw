import { FolderIcon, UserGroupIcon, UserIcon } from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";

type Props = {
    open: boolean;
};

const PmSidebar: React.FC<Props> = ({ open }) => {
    return (
        <>
            <ul className={`${!open && "invisible"}`}>
                <SidebarRow
                    Icon={UserIcon}
                    rowLink={"/pm/all-employees"}
                    rowText={"All Employees"}
                />
                <SidebarRow
                    Icon={UserGroupIcon}
                    rowLink={"/pm/my-employees"}
                    rowText={"My Employees"}
                />
                <SidebarRow
                    Icon={FolderIcon}
                    rowLink={"/pm/projects"}
                    rowText={"Projects"}
                />
            </ul>
        </>
    );
};

export default PmSidebar;
