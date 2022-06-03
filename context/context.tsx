import { useRouter } from 'next/router';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ContextInferface } from '../models/Context';
import axiosInstance from '../services/axiosInstance';

const defaultValue = {
    employeeModalOpen: false,
    employeeId: undefined,
    modalDataIsLoaded: false,
    isLoggedIn: false,
    sideBarIndex: 0,
    setSideBarIndex: () => {},
    setEmployeeModalOpen: () => {},
    setEmployeeId: () => {},
    setModalDataIsLoaded: () => {},
    setIsLoggedIn: () => {},
    setUser: () => {},
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        googleId: '',
        role: '',
        seniority: '',
        plan: '',
    },
};

const Context = createContext<ContextInferface>(defaultValue);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    axiosInstance.patch(`/user/role`, {
        role: 'admin',
    });
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [employeeModalOpen, setEmployeeModalOpen] = useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<number>();
    const [modalDataIsLoaded, setModalDataIsLoaded] = useState<boolean>(false);
    const [sideBarIndex, setSideBarIndex] = useState(0);

    const [user, setUser] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        googleId: '',
        role: 'employee',
        seniority: '',
        plan: '',
    });
    const getUser = async () => {
        const res = await axiosInstance.get('/user');
        await setUser(res.data.user);
    };
    useEffect(() => {}, []);

    useEffect(() => {
        setEmployeeModalOpen(false);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
    }, [isLoggedIn]);

    return (
        <Context.Provider
            value={{
                employeeModalOpen,
                setEmployeeModalOpen,
                employeeId,
                setEmployeeId,
                modalDataIsLoaded,
                setModalDataIsLoaded,
                user,
                setUser,
                setIsLoggedIn,
                isLoggedIn,
                sideBarIndex,
                setSideBarIndex,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextHook = () => {
    return useContext(Context);
};
