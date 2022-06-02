import {
    ArrowDownIcon,
    ChevronDownIcon,
    DownloadIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { Employee, EmployeesRes } from '../../models/Employees';
import Card from '../Card';
import Spinner from '../layout/Spinner';
import CardItem from './CardItem';
import EmployeeList from './EmployeeList';
import PmFilters from './PmFilters';

const Employees: React.FC<EmployeesRes> = ({ employeesRes }) => {
    const [showFilters, setShowFilters] = useState(false);

    // if (!employeesRes) return <Spinner />;
    return (
        <>
            <p className="text-center font-bold text-3xl">Employees</p>
            <section className="relative">
                <div
                    className="bg-gray-800 text-gray-300 p-2 rounded-md m-2 relative group hover:cursor-pointer flex max-w-fit items-center"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <p>Filters</p>
                    <ChevronDownIcon
                        className={`transition-all duration-150 w-5 h-5 ${
                            showFilters && 'rotate-180'
                        }`}
                    />
                </div>
                <PmFilters
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                />
            </section>
            {employeesRes ? (
                <EmployeeList employees={employeesRes.employees} />
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default Employees;
