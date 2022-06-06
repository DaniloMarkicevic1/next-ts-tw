import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import Spinner from '../../components/layout/Spinner';
import Projects from '../../components/pm/Projects';
import axiosInstance from '../../services/axiosInstance';
import { fetcher } from '../../services/fetcher';
const ProjectsPage: NextPage = () => {
    const { data, error } = useSWR(`pm/projects`, fetcher);

    if (error) return <p>An Error</p>;
    if (!data) return <Spinner />;

    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <Projects projects={data.projects} />
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
            destination: `${role !== 'project_manager' ? '/404' : ''}`,
            permanent: true,
        },
    };
};
export default ProjectsPage;
