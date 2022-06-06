import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import AllEmployees from '../../components/admin/Employees';
import axiosInstance from '../../services/axiosInstance';

const AdminEmployees: NextPage = () => {
    return (
        <>
            <Head>
                <title>Employees</title>
            </Head>
            <AllEmployees />
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

    return {
        props: { role: role },
        redirect: {
            destination: `${role !== 'admin' ? '/404' : ''}`,
            permanent: true,
        },
    };
};

export default AdminEmployees;
