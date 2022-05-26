import {
    ArrowDownIcon,
    ChevronDownIcon,
    DownloadIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { Employee, EmployeesRes } from '../../models/Employees';
import Card from '../Card';
import PmFilters from './PmFilters';

const Employees: React.FC<EmployeesRes> = ({ employeesRes }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <p className="text-center font-bold text-3xl">Employees</p>
            <section className="relative">
                <div
                    className="relative group hover:cursor-pointer flex max-w-fit items-center"
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
            {!employeesRes ? (
                <p>Loading</p>
            ) : (
                <ul>
                    {employeesRes.employees.map((employee: Employee) => (
                        <Card key={employee.id} employeeId={employee.id}>
                            <p>
                                Name: {employee.firstName} {employee.lastName}
                            </p>
                            <p>E-mail: {employee.email}</p>
                            <p>City: {employee.city?.name}</p>
                        </Card>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Employees;
