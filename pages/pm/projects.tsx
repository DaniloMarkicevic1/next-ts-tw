import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import Spinner from '../../components/layout/Spinner';
import Projects from '../../components/pm/Projects';
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
export default ProjectsPage;
