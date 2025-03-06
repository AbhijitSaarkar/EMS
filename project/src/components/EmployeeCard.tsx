import React from 'react';
import { Mail, Briefcase, Calendar, Building2 } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: string) => void;
}

export function EmployeeCard({ employee, onDelete }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Briefcase size={18} className="mr-2" />
              <span>{employee.position}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building2 size={18} className="mr-2" />
              <span>{employee.department}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              <span>{new Date(employee.startDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              employee.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(employee.id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}