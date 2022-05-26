import {
    AcademicCapIcon,
    ClipboardCheckIcon,
    CodeIcon,
    CogIcon,
    FolderIcon,
    GlobeIcon,
    OfficeBuildingIcon,
    UserGroupIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";

type Props = {
    open: boolean;
};

const AdminSidebar: React.FC<Props> = ({ open }) => {
    return (
        <>
            <ul className={`mt-4  ${!open ? "pointer-events-none" : ""}`}>
                <SidebarRow
                    Icon={UserGroupIcon}
                    rowLink={"/admin/employees"}
                    rowText={"Employees"}
                />
                <SidebarRow
                    Icon={FolderIcon}
                    rowLink={"/admin/projects"}
                    rowText={"Projects"}
                />
                <SidebarRow
                    Icon={CodeIcon}
                    rowLink={"/admin/technologies"}
                    rowText={"Technologies"}
                />
                <SidebarRow
                    Icon={GlobeIcon}
                    rowLink={"/admin/countries"}
                    rowText={"Countries"}
                />
                <SidebarRow
                    Icon={OfficeBuildingIcon}
                    rowLink={"/admin/cities"}
                    rowText={"Cities"}
                />
                <SidebarRow
                    Icon={ClipboardCheckIcon}
                    rowLink={"/admin/project-managers"}
                    rowText={"Project Managers"}
                />
                <SidebarRow
                    Icon={CogIcon}
                    rowLink={"/admin/system-admins"}
                    rowText={"System Administrators"}
                />
                <SidebarRow
                    Icon={AcademicCapIcon}
                    rowLink={"/admin/seniorities"}
                    rowText={"Seniorities"}
                />
            </ul>
        </>
    );
};

export default AdminSidebar;
