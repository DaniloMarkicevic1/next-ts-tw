import { GetServerSideProps } from 'next';
import Head from 'next/head';
import axiosInstance from '../../services/axiosInstance';

const SeniorityPage = () => {
    return (
        <>
            <Head>
                <title>Seniorities</title>
            </Head>
            <section>
                <p className="text-3xl font-bold text-center pb-10">
                    Seniorities:
                </p>
                <p className="text-xl text-center text-gray-800">Intern</p>
                <p className="text-xl text-center text-gray-800">Junior</p>
                <p className="text-xl text-center text-gray-800">Medior</p>
                <p className="text-xl text-center text-gray-800">Senior</p>
            </section>
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

export default SeniorityPage;
