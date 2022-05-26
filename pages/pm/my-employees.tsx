import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Employees from "../../components/pm/Employees";
import { useFilterContextHook } from "../../context/filter-context";
import { EmployeesRes } from "../../models/Employees";
import { fetcher } from "../../services/fetcher";

const MyEmployeesPage: NextPage<EmployeesRes> = () => {
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

    const { data } = useSWR(
        () =>
            (country && countryValue) ||
            (city && cityValue) ||
            (seniority && seniorityValue) ||
            (project && projectValue) ||
            (projectManager && pmValue) ||
            (technology && technologyValue)
                ? `pm/pm-employees?search=${name}&${city}=${cityValue}&${country}=${countryValue}&${seniority}=${seniorityValue.toLowerCase()}&${project}=${projectValue}&${projectManager}=${pmValue}&${technology}=${technologyValue}`
                : `pm/pm-employees`,
        fetcher
    );
    return (
        <>
            <Head>
                <title>My Employees</title>
            </Head>
            {/* List of PM Employees */}
            <Employees employeesRes={data} />
        </>
    );
};

export default MyEmployeesPage;
