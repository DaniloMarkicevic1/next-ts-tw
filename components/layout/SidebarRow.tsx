import Link from "next/link";
import React from "react";
import { SidebarRow } from "../../models/SidebarRow";

const SidebarRow: React.FC<SidebarRow> = ({ Icon, rowText, rowLink }) => {
    return (
        <li
            className="
                relative
                bg-green-800 z-10 
                text-gray-300
                after:content-['']
                after:absolute 
                after:top-0 
                after:left-0 
                after:w-full 
                after:h-full 
                after:bg-green-300 
                after:text-green-800
                after:-z-10 
                after:scale-x-0 
                after:origin-right 
                after:ease-in
                after:hover:scale-x-100 
                after:transition-transform
                after:hover:origin-left
                after:duration-200
                hover:text-gray-800
                hover:transition-colors
                hover:duration-200
                "
        >
            <Link href={rowLink}>
                <a className="flex items-center w-full h-full p-3">
                    <Icon width={20} height={20} className="mr-2" />
                    {rowText}
                </a>
            </Link>
        </li>
    );
};

export default SidebarRow;
