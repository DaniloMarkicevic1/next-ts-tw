import { NextPage } from "next";
import Head from "next/head";
import Projects from "../../../components/admin/Projects";

const ProjectsPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <Projects />
        </>
    );
};

export default ProjectsPage;
