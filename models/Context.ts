import { Dispatch, SetStateAction } from 'react';
import { User } from './User';

export interface ContextInferface {
    employeeModalOpen: boolean;
    setEmployeeModalOpen: Dispatch<SetStateAction<boolean>>;
    employeeId: number | undefined;
    setEmployeeId: Dispatch<SetStateAction<number | undefined>>;
    modalDataIsLoaded: boolean;
    setModalDataIsLoaded: Dispatch<SetStateAction<boolean>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
}
