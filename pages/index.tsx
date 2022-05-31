import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Login from '../components/login/Login';
import { useContextHook } from '../context/context';

const Home: NextPage = () => {
    const { isLoggedIn, user } = useContextHook();

    const router = useRouter();

    useEffect(() => {
        user.role === 'admin' && router.push('admin/employees');
        user.role === 'project_manager' && router.push('pm/all-employees');
    }, [user, router]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Login />
        </>
    );
};

export default Home;
