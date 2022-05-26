import { NextPage } from "next";
import Head from "next/head";
import EditProject from "../../../../components/admin/EditProject";

const EditProjectPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Edit Project</title>
            </Head>
            {/* Add Change Project Manager */}
            {/* Add Change Project Name */}
            {/* Add and Remove Employees working on project */}
            <EditProject />
        </>
    );
};

export default EditProjectPage;
