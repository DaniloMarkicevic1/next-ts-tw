import Head from "next/head";
import React from "react";
import ProjectManagers from "../../components/admin/ProjectManagers";

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

export default ProjectManagersPage;
