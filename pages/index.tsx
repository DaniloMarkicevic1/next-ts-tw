import type { NextPage } from 'next';
import Head from 'next/head';

import Login from '../components/login/Login';

const Home: NextPage = () => {
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
