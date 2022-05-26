import { Props } from '../../models/Props';
import Header from './Header';
import { useState } from 'react';
import Sidebar from './Sidebar';
import EmployeeModal from '../pm/EmployeeModal';
import { useContextHook } from '../../context/context';

const Layout: React.FC<Props> = ({ children }) => {
    const { user } = useContextHook();
    const [open, setOpen] = useState(true);
    const role = user.role;
    return (
        <>
            {role === 'admin' || role === 'project_manager' ? (
                <>
                    <Header setOpen={setOpen} open={open} />
                    <Sidebar open={open} role={user.role} />
                    <main
                        className={`bg-gray-300 p-5 transition-all duration-300 h-[calc(100%-64px)] ease-in-out overflow-auto`}
                    >
                        {children}
                    </main>
                </>
            ) : (
                <main className="bg-gray-300 h-full grid items-center justify-center">
                    {children}
                </main>
            )}
            {role === 'pm' && <EmployeeModal />}
        </>
    );
};

export default Layout;
