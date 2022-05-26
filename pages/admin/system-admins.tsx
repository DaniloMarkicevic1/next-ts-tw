import Head from "next/head";
import React from "react";
import SystemAdmins from "../../components/admin/SystemAdmins";

type Props = {};

const SystemAdminsPage = (props: Props) => {
    return (
        <>
            <Head>
                <title>System Administrators</title>
            </Head>
            <SystemAdmins />
        </>
    );
};

export default SystemAdminsPage;
