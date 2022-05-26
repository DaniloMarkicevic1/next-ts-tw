import Image from 'next/image';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';
import { useContextHook } from '../../context/context';
import LogoImage from '../../public/assets/images/LogoImage.png';
import axiosInstance from '../../services/axiosInstance';

const Login = () => {
    const { user, setIsloggedIn } = useContextHook();

    const loginFunction = async (data: any) => {
        const res = await axiosInstance.post(
            `http://localhost:3005/google-auth`,
            {
                token: data.tokenId,
            },
            { withCredentials: true }
        );
        if (res.status === 200) {
            setIsloggedIn(true);
        }
    };
    return (
        <section className="grid">
            {user.email === '' ? (
                <>
                    <Image alt="logo" src={LogoImage} className="scale-75" />
                    <GoogleLogin
                        buttonText="SignIn"
                        clientId="1042734906801-tpmiqqk7r7ogkh8upapp09hmj8lsj137.apps.googleusercontent.com"
                        onSuccess={loginFunction}
                        onFailure={() => {}}
                        cookiePolicy="single_host_origin"
                    ></GoogleLogin>
                </>
            ) : (
                <p className="text-5xl">Welcome {user.firstName}</p>
            )}
        </section>
    );
};

export default Login;
