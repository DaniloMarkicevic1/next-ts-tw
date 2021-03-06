import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import Employees from '../../components/pm/Employees';
import { useFilterContextHook } from '../../context/filter-context';
import { EmployeesRes } from '../../models/Employees';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';

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
export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;

    const res = await axiosInstance.get(`/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const role = res.data.user.role;
    if (role !== 'project_manager') {
        return {
            props: { role: role },
            redirect: {
                destination: '/404',
                permanent: true,
            },
        };
    } else {
        return {
            props: { role: role },
        };
    }
};

export default AllEmployeesPage;
