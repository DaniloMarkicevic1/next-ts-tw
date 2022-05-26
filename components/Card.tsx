import { ReactNode } from "react";
import { useContextHook } from "../context/context";

interface Props {
    children: ReactNode;
    employeeId: number;
}

const Card: React.FC<Props> = ({ children, employeeId }) => {
    const { setEmployeeModalOpen, setEmployeeId, modalDataIsLoaded } =
        useContextHook();
    return (
        <li
            onClick={() => {
                setEmployeeId && setEmployeeId(employeeId);
                setEmployeeModalOpen && setEmployeeModalOpen(true);
            }}
            className={`
            rounded-lg
            relative 
            text-gray-300 
            transition-all
            items-center
            ${!modalDataIsLoaded && "z-40 duration-300"}
            ${modalDataIsLoaded && "z-20 duration-300"}
            flex 
            space-x-2 
            py-6
            pl-3 
            mb-2
            bg-green-700 
            hover:text-gray-700
            hover:cursor-pointer
            after:origin-cursor
            after:absolute 
            after:rounded-full
            after:top-0
            after:left-0
            after:w-full 
            after:h-full 
            after:-z-10 
            after:scale-y-0
            after:scale-x-0 
            after:hover:rounded-lg
            after:hover:scale-x-100 
            after:hover:scale-y-100 
            after:hover:bg-green-600
            after:duration-300
            active:opacity-90
            `}
        >
            {children}
        </li>
    );
};

export default Card;
