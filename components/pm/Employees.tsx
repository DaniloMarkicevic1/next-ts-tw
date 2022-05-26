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
                        <>
                            {console.log(employee)}
                            <Card key={employee.id} employeeId={employee.id}>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">Name:</span>
                                    {employee.firstName} {employee.lastName}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">
                                        E-mail:
                                    </span>
                                    {employee.email}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">City:</span>
                                    {employee.city?.name}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">
                                        Country:
                                    </span>
                                    {employee.city?.country.name}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">
                                        Project:
                                    </span>
                                    {employee.project?.name}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="grid justify-center text-center">
                                    <span className="text-gray-800">
                                        Project Manager:
                                    </span>
                                    {
                                        employee.project?.projectManager
                                            ?.firstName
                                    }
                                    {employee.project?.projectManager?.lastName}
                                </p>
                                <div className="bg-gray-900 w-0.5 h-10"></div>
                                <p className="capitalize grid justify-center text-center">
                                    <span className="text-gray-800">
                                        Seniority:
                                    </span>
                                    {employee.seniority}
                                </p>
                            </Card>
                        </>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Employees;
