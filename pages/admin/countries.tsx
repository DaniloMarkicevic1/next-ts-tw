import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Countries from '../../components/admin/Countries';
import axiosInstance from '../../services/axiosInstance';

type Props = {};

const CountriesPage = (props: Props) => {
    return (
        <>
            <Head>
                <title>Countries</title>
            </Head>
            <Countries />
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

export default CountriesPage;
