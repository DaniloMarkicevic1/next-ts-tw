import { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import Employees from "../../components/pm/Employees";
import { useFilterContextHook } from "../../context/filter-context";
import { EmployeesRes } from "../../models/Employees";
import { fetcher } from "../../services/fetcher";

const AllEmployeesPage: NextPage = () => {
    const {
        city,
        cityValue,
        country,
        countryValue,
        seniority,
        seniorityValue,
        project,
        projectValue,
        projectManager,
        pmValue,
        technology,
        technologyValue,
        name,
    } = useFilterContextHook();

    const { data, error } = useSWR(
        () =>
            (country && countryValue) ||
            (city && cityValue) ||
            (seniority && seniorityValue) ||
            (project && projectValue) ||
            (projectManager && pmValue) ||
            (technology && technologyValue)
                ? `pm/employees?search=${name}&${city}=${cityValue}&${country}=${countryValue}&${seniority}=${seniorityValue.toLowerCase()}&${project}=${projectValue}&${projectManager}=${pmValue}&${technology}=${technologyValue}`
                : `pm/employees`,
        fetcher
    );
    return (
        <>
            <Head>
                <title>All Employees</title>
            </Head>
            {/* List of all Employees */}
            <Employees employeesRes={data} />
        </>
    );
};

export default AllEmployeesPage;
