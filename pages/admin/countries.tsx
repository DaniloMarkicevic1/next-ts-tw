import Head from "next/head";
import React from "react";
import Countries from "../../components/admin/Countries";

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

export default CountriesPage;
