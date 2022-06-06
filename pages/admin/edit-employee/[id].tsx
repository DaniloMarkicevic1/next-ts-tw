import { GetServerSideProps } from 'next';
import EditUser from '../../../components/admin/edit-user/EditUser';
import axiosInstance from '../../../services/axiosInstance';

const AdminEditEmployee = () => {
    return <EditUser />;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;

    const res = await axiosInstance.get(`/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const role = res.data.user.role;

    return {
        props: { role: role },
        redirect: {
            destination: `${role !== 'admin' ? '/404' : ''}`,
            permanent: true,
        },
    };
};

export default AdminEditEmployee;
