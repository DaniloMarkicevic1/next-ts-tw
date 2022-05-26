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
}

const defaultValue = {
    employeeModalOpen: false,
    employeeId: undefined,
    modalDataIsLoaded: false,
    setEmployeeModalOpen: () => {},
    setEmployeeId: () => {},
    setModalDataIsLoaded: () => {},
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
    const [isLoggedIn, setIsloggedIn] = useState(false);
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
        if (user.role === 'admin') {
            router.push(`admin/employees`);
        }
        if (user.role === 'project_manager') {
            router.push(`pm/all-employees`);
        }
    };

    useEffect(() => {
        setEmployeeModalOpen(false);
    }, []);

    useEffect(() => {
        // setIsloggedIn(true);
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
                setIsloggedIn,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextHook = () => {
    return useContext(Context);
};
