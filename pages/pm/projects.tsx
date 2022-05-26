import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Projects from "../../components/pm/Projects";
import { Projects as ProjectsType } from "../../models/Projects";
import { fetcher } from "../../services/fetcher";
const ProjectsPage: NextPage<ProjectsType> = ({ projects }) => {
    const { data, error } = useSWR(`pm/projects`, fetcher);
    if (error) return <p>An Error</p>;
    if (!data) return <p>Loading</p>;
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
