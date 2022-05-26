import Head from "next/head";
import React from "react";
import Technologies from "../../components/admin/Technologies";

const TechnologiesPage = () => {
    return (
        <>
            <Head>
                <title>Technologies</title>
            </Head>
            <Technologies />
        </>
    );
};

export default TechnologiesPage;
