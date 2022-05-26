import Head from "next/head";

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

export default SeniorityPage;
