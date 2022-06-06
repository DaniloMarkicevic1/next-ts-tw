import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import EditProject from '../../../../components/admin/EditProject';
import axiosInstance from '../../../../services/axiosInstance';

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

export default EditProjectPage;
