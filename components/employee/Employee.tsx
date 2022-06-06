import { useContextHook } from '../../context/context';

const Employee = () => {
    const { user } = useContextHook();
    console.log(user);
    return (
        <>
            <section className="grid">
                <p>
                    Name: {user?.firstName} {user?.lastName}
                </p>
                <p>E-mail: {user?.email}</p>
                <p>Project: {user?.project?.name}</p>
                <p>Project Manager : {user?.pm_project?.name}</p>
                <p>City: {user?.city?.name}</p>
                <p>Country: {user?.city?.country?.name}</p>
                <p>Role: {user?.role}</p>
                <p>Seniority: {user?.seniority}</p>
                <p>
                    Technologies:{' '}
                    {user?.technologies?.map((tech) => tech.name + ', ')}
                </p>
                <p className="font-bold text-3xl">Plan: {user?.plan}</p>
            </section>
        </>
    );
};

export default Employee;
