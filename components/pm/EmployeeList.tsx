import React from 'react';
import { Employee } from '../../models/Employees';
import Card from '../Card';
import CardItem from './CardItem';

type Props = {
    employees: Employee[];
};

const EmployeeList: React.FC<Props> = ({ employees }) => {
    return (
        <ul>
            {employees.map((employee: Employee) => (
                <Card key={`${employee.id}`} employeeId={employee.id}>
                    <CardItem
                        text={`${employee.firstName} ${employee.lastName}`}
                        label="Name:"
                    />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem text={employee.email} label="E-mail:" />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem text={employee.city?.name} label="City:" />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem
                        text={employee.city?.country?.name}
                        label="Country:"
                    />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem text={employee.project?.name} label="Project:" />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem
                        text={`${
                            employee.project?.projectManager?.firstName || 'N/A'
                        } ${employee.project?.projectManager?.lastName || ''}`}
                        label="Project Manager:"
                    />
                    <div className="bg-gray-900 w-0.5 h-10"></div>
                    <CardItem text={employee.seniority} label="Seniority:" />
                </Card>
            ))}
        </ul>
    );
};

export default EmployeeList;
