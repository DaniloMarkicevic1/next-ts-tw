import Image from 'next/image';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';
import { useContextHook } from '../../context/context';
import LogoImage from '../../public/assets/images/LogoImage.png';
import axiosInstance from '../../services/axiosInstance';

const Login = () => {
    const { user, setIsLoggedIn, isLoggedIn } = useContextHook();

    const router = useRouter();

    const loginFunction = async (data: any) => {
        const res = await axiosInstance.post(
            `http://localhost:3005/google-auth`,
            {
                token: data.tokenId,
            },
            { withCredentials: true }
        );
        if (res.status === 200) {
            setIsLoggedIn(true);
        }
    };

    const handleLogout = async () => {
        const res = await axiosInstance.post(`/logout`);
        window.localStorage.removeItem('token');
        router.push('/');
        setIsLoggedIn(false);
    };

    return (
        <section className="grid justify-items-center bg-gray-400 rounded-md p-3">
            <Image alt="logo" src={LogoImage} className="scale-75" />
            {!isLoggedIn ? (
                <>
                    <GoogleLogin
                        className="w-full"
                        buttonText="SignIn"
                        clientId="1042734906801-tpmiqqk7r7ogkh8upapp09hmj8lsj137.apps.googleusercontent.com"
                        onSuccess={loginFunction}
                        onFailure={() => {}}
                        cookiePolicy="single_host_origin"
                    >
                        Sign In With Google
                    </GoogleLogin>
                </>
            ) : (
                <>
                    <p className="text-5xl">Welcome {user.firstName}</p>
                    <button
                        onClick={() => handleLogout()}
                        className="bg-gray-800 text-white rounded-md w-1/2 py-2 mt-5 hover:bg-opacity-75"
                    >
                        Logout
                    </button>
                </>
            )}
        </section>
    );
};

export default Login;
