import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import AllEmployees from '../../components/admin/Employees';

const AdminEmployees: NextPage = () => {
    return (
        <>
            <Head>
                <title>Employees</title>
            </Head>
            <AllEmployees />
        </>
    );
};

export default AdminEmployees;
