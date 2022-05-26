import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Cities from "../../components/admin/Cities";

const CitiesPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Cities</title>
            </Head>
            <Cities />
        </>
    );
};

export default CitiesPage;
