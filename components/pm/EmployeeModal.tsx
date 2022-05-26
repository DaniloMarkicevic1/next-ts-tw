import { useEffect } from "react";
import useSWR from "swr";
import { useContextHook } from "../../context/context";
import { fetcher } from "../../services/fetcher";
import PmEditEmployee from "./PmEditEmployee";

const EmployeeModal: React.FC = () => {
    const {
        employeeModalOpen,
        setEmployeeModalOpen,
        employeeId,
        setModalDataIsLoaded,
        modalDataIsLoaded,
    } = useContextHook();
    const { data, error, mutate } = useSWR(
        () => (employeeId ? `pm/employees/${employeeId}` : null),
        fetcher
    );
    const { data: projectData, error: projectError } = useSWR(
        `pm/projects`,
        fetcher
    );
    console.log(data);
    useEffect(() => {
        if (employeeModalOpen) {
            setModalDataIsLoaded && setModalDataIsLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeModalOpen]);

    if (error || projectError) return null;
    if (!data || !projectData) return null;

    return (
        <div
            id="backdrop"
            onClick={(e: any) => {
                if (e.target.id === "backdrop") {
                    setEmployeeModalOpen && setEmployeeModalOpen(false);
                    setModalDataIsLoaded && setModalDataIsLoaded(false);
                }
            }}
            className={`
                ${modalDataIsLoaded ? "opacity-1 z-50" : "opacity-0 -z-20"}
                transition-all
                duration-300
                absolute
                flex
                flex-col
                items-center
                justify-center
                bg-black
                bg-opacity-80
                top-0
                left-0
                w-full
                h-full`}
        >
            <PmEditEmployee
                mutate={mutate}
                employee={data.user}
                projects={projectData.projects}
                modalOpen={employeeModalOpen!}
            />
        </div>
    );
};

export default EmployeeModal;
