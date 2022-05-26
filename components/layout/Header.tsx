import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useContextHook } from '../../context/context';
import LogoImage from '../../public/assets/images/LogoImage.png';
import axiosInstance from '../../services/axiosInstance';

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
}

const Navbar: React.FC<Props> = ({ setOpen, open }) => {
    const { user, setUser, setIsloggedIn } = useContextHook();
    const router = useRouter();
    const handleLogout = async () => {
        const res = await axiosInstance.post(`/logout`);
        window.localStorage.removeItem('token');
        setIsloggedIn(false);
        router.push('/');
        setUser({
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            googleId: '',
            role: '',
            seniority: '',
            plan: '',
        });
        console.log(res);
    };

    return (
        <header className="text-gray-300 items-center px-5 h-16 bg-green-800 flex justify-between w-full">
            <div className="flex items-center justify-between h-full">
                <button
                    onClick={() => setOpen(!open)}
                    className={`z-50 rounded-full flex items-center w-7 h-7 hover:cursor-pointer relative hover:bg-green-900 mr-4`}
                >
                    <MenuIcon
                        className={`absolute transition-all duration-500 ease-in-out transform-all ${
                            open ? 'opacity-0' : 'opacity-100 block'
                        }`}
                    />
                    <XIcon
                        className={`absolute transition-all duration-500 ease-in-out transform-all ${
                            !open ? 'opacity-0 rotate-180' : 'block opacity-100'
                        }`}
                    />
                </button>
                <Image alt="logo" src={LogoImage} width={60} height={50} />
            </div>
            <span className="flex space-x-5">
                {user?.id ? (
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                ) : (
                    ''
                )}
                <button
                    onClick={() => handleLogout()}
                    className="flex items-center"
                >
                    Logout
                    <LogoutIcon width={20} height={20} className="ml-2" />
                </button>
            </span>
        </header>
    );
};

export default Navbar;
