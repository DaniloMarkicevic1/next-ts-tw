import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import SystemAdmins from '../../components/admin/SystemAdmins';
import axiosInstance from '../../services/axiosInstance';

type Props = {};

const SystemAdminsPage = (props: Props) => {
    return (
        <>
            <Head>
                <title>System Administrators</title>
            </Head>
            <SystemAdmins />
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

export default SystemAdminsPage;
