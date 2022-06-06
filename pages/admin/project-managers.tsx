import Head from 'next/head';
import React from 'react';
import ProjectManagers from '../../components/admin/ProjectManagers';
import axiosInstance from '../../services/axiosInstance';
import { GetServerSideProps } from 'next';

const ProjectManagersPage = () => {
    return (
        <>
            <Head>
                <title>Project Managers</title>
            </Head>
            <ProjectManagers />
        </>
    );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;

    const res = await axiosInstance.get(`/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const role = res.data.user.role;
    if (role !== 'admin') {
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

export default ProjectManagersPage;
