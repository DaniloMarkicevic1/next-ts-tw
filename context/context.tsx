import { useRouter } from 'next/router';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { User } from '../models/User';
import axiosInstance from '../services/axiosInstance';
interface ContextInferface {
    employeeModalOpen: boolean;
    setEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
    employeeId: number | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | undefined>>;
    modalDataIsLoaded: boolean;
    setModalDataIsLoaded: Dispatch<SetStateAction<boolean>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const defaultValue = {
    employeeModalOpen: false,
    employeeId: undefined,
    modalDataIsLoaded: false,
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
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [employeeModalOpen, setEmployeeModalOpen] = useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<number>();
    const [modalDataIsLoaded, setModalDataIsLoaded] = useState<boolean>(false);
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
        setUser(res.data.user);
    };

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
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextHook = () => {
    return useContext(Context);
};
