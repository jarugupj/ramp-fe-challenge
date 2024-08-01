import React, { useEffect } from "react";
import { useEmployees } from "./useEmployees";

export const EmployeeFilter: React.FC = () => {
  const { data: employees, loading: employeesLoading, fetchAll } = useEmployees();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <select disabled={employeesLoading}>
        {employeesLoading ? (
          <option>Loading employees...</option>
        ) : (
          <>
            <option value="">All Employees</option>
            {employees?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};
